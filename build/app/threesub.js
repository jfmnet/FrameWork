/** /////////////////////////////////////////////////////////////////////////////////
//
// @description Loop Subdivision Surface
// @about       Smooth subdivision surface modifier for use with three.js BufferGeometry
// @author      Stephens Nunnally <@stevinz>
// @license     MIT - Copyright (c) 2022 Stephens Nunnally and Scidian Software
// @source      https://github.com/stevinz/three-subdivide
//
//      See end of file for license details and acknowledgements
//
///////////////////////////////////////////////////////////////////////////////////*/
///// Constants
var POSITION_DECIMALS = 2;
///// Local Variables
var _average = new THREE.Vector3();
var _center = new THREE.Vector3();
var _midpoint = new THREE.Vector3();
var _normal = new THREE.Vector3();
var _temp = new THREE.Vector3();
var _vector0 = new THREE.Vector3(); // .Vector4();
var _vector1 = new THREE.Vector3(); // .Vector4();
var _vector2 = new THREE.Vector3(); // .Vector4();
var _vec0to1 = new THREE.Vector3();
var _vec1to2 = new THREE.Vector3();
var _vec2to0 = new THREE.Vector3();
var _position = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
];
var _vertex = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
];
var _triangle = new THREE.Triangle();
/////////////////////////////////////////////////////////////////////////////////////
/////   Loop Subdivision Surface
/////////////////////////////////////////////////////////////////////////////////////
/** Loop subdivision surface modifier for use with modern three.js BufferGeometry */
var LoopSubdivision = /** @class */ (function () {
    function LoopSubdivision() {
    }
    /////////////////////////////////////////////////////////////////////////////////////
    /////   Modify
    ////////////////////
    /**
     * Applies Loop subdivision modifier to geometry
     *
     * @param {Object} bufferGeometry - Three.js geometry to be subdivided
     * @param {Number} iterations - How many times to run subdividion
     * @param {Object} params - Optional parameters object, see below
     * @returns {Object} Returns new, subdivided, three.js BufferGeometry object
     *
     * Optional Parameters Object
     * @param {Boolean} split - Should coplanar faces be divided along shared edges before running Loop subdivision?
     * @param {Boolean} uvSmooth - Should UV values be averaged during subdivision?
     * @param {Boolean} preserveEdges - Should edges / breaks in geometry be ignored during subdivision?
     * @param {Boolean} flatOnly - If true, subdivision generates triangles, but does not modify positions
     * @param {Number} maxTriangles - If geometry contains more than this many triangles, subdivision will not continue
    */
    LoopSubdivision.modify = function (bufferGeometry, iterations, params) {
        if (iterations === void 0) { iterations = 1; }
        if (arguments.length > 3)
            console.warn("LoopSubdivision.modify() now uses a parameter object. See readme for more info!");
        if (typeof params !== 'object')
            params = {};
        ///// Parameters
        if (params.split === undefined)
            params.split = true;
        if (params.uvSmooth === undefined)
            params.uvSmooth = false;
        if (params.preserveEdges === undefined)
            params.preserveEdges = false;
        if (params.flatOnly === undefined)
            params.flatOnly = false;
        if (params.maxTriangles === undefined)
            params.maxTriangles = Infinity;
        ///// Geometries
        if (!verifyGeometry(bufferGeometry))
            return bufferGeometry;
        var modifiedGeometry = bufferGeometry.clone();
        ///// Presplit
        if (params.split) {
            var splitGeometry = LoopSubdivision.edgeSplit(modifiedGeometry);
            modifiedGeometry.dispose();
            modifiedGeometry = splitGeometry;
        }
        var _loop_1 = function (i) {
            var currentTriangles = modifiedGeometry.attributes.position.count / 3;
            if (currentTriangles < params.maxTriangles) {
                var subdividedGeometry_1;
                // Subdivide
                if (params.flatOnly) {
                    subdividedGeometry_1 = LoopSubdivision.flat(modifiedGeometry);
                }
                else {
                    subdividedGeometry_1 = LoopSubdivision.smooth(modifiedGeometry, params);
                }
                // Copy and Resize Groups
                modifiedGeometry.groups.forEach(function (group) {
                    subdividedGeometry_1.addGroup(group.start * 4, group.count * 4, group.materialIndex);
                });
                // Clean Up
                modifiedGeometry.dispose();
                modifiedGeometry = subdividedGeometry_1;
            }
        };
        ///// Apply Subdivision
        for (var i = 0; i < iterations; i++) {
            _loop_1(i);
        }
        ///// Return New Geometry
        return modifiedGeometry;
    };
    /////////////////////////////////////////////////////////////////////////////////////
    /////   Split Hypotenuse
    ////////////////////
    /**
     * Applies one iteration of split subdivision. Splits all triangles at edges shared by coplanar triangles.
     * Starts by splitting at longest shared edge, followed by splitting from that new center edge point to the
     * center of any other shared edges.
     */
    LoopSubdivision.edgeSplit = function (geometry) {
        ///// Geometries
        if (!verifyGeometry(geometry))
            return geometry;
        var existing = (geometry.index !== null) ? geometry.toNonIndexed() : geometry.clone();
        var split = new THREE.BufferGeometry();
        ///// Attributes
        var attributeList = gatherAttributes(existing);
        var vertexCount = existing.attributes.position.count;
        var posAttribute = existing.getAttribute('position');
        var norAttribute = existing.getAttribute('normal');
        var edgeHashToTriangle = {};
        var triangleEdgeHashes = [];
        var edgeLength = {};
        var triangleExist = [];
        ///// Edges
        for (var i = 0; i < vertexCount; i += 3) {
            // Positions
            _vector0.fromBufferAttribute(posAttribute, i + 0);
            _vector1.fromBufferAttribute(posAttribute, i + 1);
            _vector2.fromBufferAttribute(posAttribute, i + 2);
            _normal.fromBufferAttribute(norAttribute, i);
            var vecHash0 = hashFromVector(_vector0);
            var vecHash1 = hashFromVector(_vector1);
            var vecHash2 = hashFromVector(_vector2);
            // Verify Area
            var triangleSize = _triangle.set(_vector0, _vector1, _vector2).getArea();
            triangleExist.push(!fuzzy(triangleSize, 0));
            if (!triangleExist[i / 3]) {
                triangleEdgeHashes.push([]);
                continue;
            }
            // Calculate Normals
            calcNormal(_normal, _vector0, _vector1, _vector2);
            var normalHash = hashFromVector(_normal);
            // Vertex Hashes
            var hashes = [
                "".concat(vecHash0, "_").concat(vecHash1, "_").concat(normalHash),
                "".concat(vecHash1, "_").concat(vecHash0, "_").concat(normalHash),
                "".concat(vecHash1, "_").concat(vecHash2, "_").concat(normalHash),
                "".concat(vecHash2, "_").concat(vecHash1, "_").concat(normalHash),
                "".concat(vecHash2, "_").concat(vecHash0, "_").concat(normalHash),
                "".concat(vecHash0, "_").concat(vecHash2, "_").concat(normalHash),
            ];
            // Store Edge Hashes
            var index = i / 3;
            for (var j = 0; j < hashes.length; j++) {
                // Attach Triangle Index to Edge Hash
                if (!edgeHashToTriangle[hashes[j]])
                    edgeHashToTriangle[hashes[j]] = [];
                edgeHashToTriangle[hashes[j]].push(index);
                // Edge Length
                if (!edgeLength[hashes[j]]) {
                    if (j === 0 || j === 1)
                        edgeLength[hashes[j]] = _vector0.distanceTo(_vector1);
                    if (j === 2 || j === 3)
                        edgeLength[hashes[j]] = _vector1.distanceTo(_vector2);
                    if (j === 4 || j === 5)
                        edgeLength[hashes[j]] = _vector2.distanceTo(_vector0);
                }
            }
            // Triangle Edge Reference
            triangleEdgeHashes.push([hashes[0], hashes[2], hashes[4]]);
        }
        ///// Build Geometry, Set Attributes
        attributeList.forEach(function (attributeName) {
            var attribute = existing.getAttribute(attributeName);
            if (!attribute)
                return;
            var floatArray = splitAttribute(attribute, attributeName);
            split.setAttribute(attributeName, new THREE.BufferAttribute(floatArray, attribute.itemSize));
        });
        ///// Morph Attributes
        var morphAttributes = existing.morphAttributes;
        for (var attributeName in morphAttributes) {
            var array = [];
            var morphAttribute = morphAttributes[attributeName];
            // Process Array of Float32BufferAttributes
            for (var i = 0, l = morphAttribute.length; i < l; i++) {
                if (morphAttribute[i].count !== vertexCount)
                    continue;
                var floatArray = splitAttribute(morphAttribute[i], attributeName, true);
                array.push(new THREE.BufferAttribute(floatArray, morphAttribute[i].itemSize));
            }
            split.morphAttributes[attributeName] = array;
        }
        split.morphTargetsRelative = existing.morphTargetsRelative;
        // Clean Up, Return New Geometry
        existing.dispose();
        return split;
        // Loop Subdivide Function
        function splitAttribute(attribute, attributeName, morph) {
            if (morph === void 0) { morph = false; }
            var newTriangles = 4; /* maximum number of new triangles */
            var arrayLength = (vertexCount * attribute.itemSize) * newTriangles;
            var floatArray = new attribute.array.constructor(arrayLength);
            var processGroups = (attributeName === 'position' && !morph && existing.groups.length > 0);
            var groupStart = undefined, groupMaterial = undefined;
            var index = 0;
            var skipped = 0;
            var step = attribute.itemSize;
            var _loop_2 = function (i) {
                // Verify Triangle is Valid
                if (!triangleExist[i / 3]) {
                    skipped += 3;
                    return "continue";
                }
                // Get Triangle Points
                _vector0.fromBufferAttribute(attribute, i + 0);
                _vector1.fromBufferAttribute(attribute, i + 1);
                _vector2.fromBufferAttribute(attribute, i + 2);
                // Check for Shared Edges
                var existingIndex = i / 3;
                var edgeHash0to1 = triangleEdgeHashes[existingIndex][0];
                var edgeHash1to2 = triangleEdgeHashes[existingIndex][1];
                var edgeHash2to0 = triangleEdgeHashes[existingIndex][2];
                var edgeCount0to1 = edgeHashToTriangle[edgeHash0to1].length;
                var edgeCount1to2 = edgeHashToTriangle[edgeHash1to2].length;
                var edgeCount2to0 = edgeHashToTriangle[edgeHash2to0].length;
                var sharedCount = (edgeCount0to1 + edgeCount1to2 + edgeCount2to0) - 3;
                // New Index (Before New Triangles, used for Groups)
                var loopStartIndex = ((index * 3) / step) / 3;
                // No Shared Edges
                if (sharedCount === 0) {
                    setTriangle(floatArray, index, step, _vector0, _vector1, _vector2);
                    index += (step * 3);
                    // Shared Edges
                }
                else {
                    var length0to1 = edgeLength[edgeHash0to1];
                    var length1to2 = edgeLength[edgeHash1to2];
                    var length2to0 = edgeLength[edgeHash2to0];
                    // Add New Triangle Positions
                    if ((length0to1 > length1to2 || edgeCount1to2 <= 1) &&
                        (length0to1 > length2to0 || edgeCount2to0 <= 1) && edgeCount0to1 > 1) {
                        _center.copy(_vector0).add(_vector1).divideScalar(2.0);
                        if (edgeCount2to0 > 1) {
                            _midpoint.copy(_vector2).add(_vector0).divideScalar(2.0);
                            setTriangle(floatArray, index, step, _vector0, _center, _midpoint);
                            index += (step * 3);
                            setTriangle(floatArray, index, step, _center, _vector2, _midpoint);
                            index += (step * 3);
                        }
                        else {
                            setTriangle(floatArray, index, step, _vector0, _center, _vector2);
                            index += (step * 3);
                        }
                        if (edgeCount1to2 > 1) {
                            _midpoint.copy(_vector1).add(_vector2).divideScalar(2.0);
                            setTriangle(floatArray, index, step, _center, _vector1, _midpoint);
                            index += (step * 3);
                            setTriangle(floatArray, index, step, _midpoint, _vector2, _center);
                            index += (step * 3);
                        }
                        else {
                            setTriangle(floatArray, index, step, _vector1, _vector2, _center);
                            index += (step * 3);
                        }
                    }
                    else if ((length1to2 > length2to0 || edgeCount2to0 <= 1) && edgeCount1to2 > 1) {
                        _center.copy(_vector1).add(_vector2).divideScalar(2.0);
                        if (edgeCount0to1 > 1) {
                            _midpoint.copy(_vector0).add(_vector1).divideScalar(2.0);
                            setTriangle(floatArray, index, step, _center, _midpoint, _vector1);
                            index += (step * 3);
                            setTriangle(floatArray, index, step, _midpoint, _center, _vector0);
                            index += (step * 3);
                        }
                        else {
                            setTriangle(floatArray, index, step, _vector1, _center, _vector0);
                            index += (step * 3);
                        }
                        if (edgeCount2to0 > 1) {
                            _midpoint.copy(_vector2).add(_vector0).divideScalar(2.0);
                            setTriangle(floatArray, index, step, _center, _vector2, _midpoint);
                            index += (step * 3);
                            setTriangle(floatArray, index, step, _midpoint, _vector0, _center);
                            index += (step * 3);
                        }
                        else {
                            setTriangle(floatArray, index, step, _vector2, _vector0, _center);
                            index += (step * 3);
                        }
                    }
                    else if (edgeCount2to0 > 1) {
                        _center.copy(_vector2).add(_vector0).divideScalar(2.0);
                        if (edgeCount1to2 > 1) {
                            _midpoint.copy(_vector1).add(_vector2).divideScalar(2.0);
                            setTriangle(floatArray, index, step, _vector2, _center, _midpoint);
                            index += (step * 3);
                            setTriangle(floatArray, index, step, _center, _vector1, _midpoint);
                            index += (step * 3);
                        }
                        else {
                            setTriangle(floatArray, index, step, _vector2, _center, _vector1);
                            index += (step * 3);
                        }
                        if (edgeCount0to1 > 1) {
                            _midpoint.copy(_vector0).add(_vector1).divideScalar(2.0);
                            setTriangle(floatArray, index, step, _vector0, _midpoint, _center);
                            index += (step * 3);
                            setTriangle(floatArray, index, step, _midpoint, _vector1, _center);
                            index += (step * 3);
                        }
                        else {
                            setTriangle(floatArray, index, step, _vector0, _vector1, _center);
                            index += (step * 3);
                        }
                    }
                    else {
                        setTriangle(floatArray, index, step, _vector0, _vector1, _vector2);
                        index += (step * 3);
                    }
                }
                // Process Groups
                if (processGroups) {
                    existing.groups.forEach(function (group) {
                        if (group.start === (i - skipped)) {
                            if (groupStart !== undefined && groupMaterial !== undefined) {
                                split.addGroup(groupStart, loopStartIndex - groupStart, groupMaterial);
                            }
                            groupStart = loopStartIndex;
                            groupMaterial = group.materialIndex;
                        }
                    });
                }
                // Reset Skipped Triangle Counter
                skipped = 0;
            };
            for (var i = 0; i < vertexCount; i += 3) {
                _loop_2(i);
            }
            // Resize Array
            var reducedCount = (index * 3) / step;
            var reducedArray = new attribute.array.constructor(reducedCount);
            for (var i = 0; i < reducedCount; i++) {
                reducedArray[i] = floatArray[i];
            }
            // Final Group
            if (processGroups && groupStart !== undefined && groupMaterial !== undefined) {
                split.addGroup(groupStart, (((index * 3) / step) / 3) - groupStart, groupMaterial);
            }
            return reducedArray;
        }
    };
    /////////////////////////////////////////////////////////////////////////////////////
    /////   Flat
    ////////////////////
    /** Applies one iteration of Loop (flat) subdivision (1 triangle split into 4 triangles) */
    LoopSubdivision.flat = function (geometry) {
        ///// Geometries
        if (!verifyGeometry(geometry))
            return geometry;
        var existing = (geometry.index !== null) ? geometry.toNonIndexed() : geometry.clone();
        var loop = new THREE.BufferGeometry();
        ///// Attributes
        var attributeList = gatherAttributes(existing);
        var vertexCount = existing.attributes.position.count;
        ///// Build Geometry
        attributeList.forEach(function (attributeName) {
            var attribute = existing.getAttribute(attributeName);
            if (!attribute)
                return;
            loop.setAttribute(attributeName, LoopSubdivision.flatAttribute(attribute, vertexCount));
        });
        ///// Morph Attributes
        var morphAttributes = existing.morphAttributes;
        for (var attributeName in morphAttributes) {
            var array = [];
            var morphAttribute = morphAttributes[attributeName];
            // Process Array of Float32BufferAttributes
            for (var i = 0, l = morphAttribute.length; i < l; i++) {
                if (morphAttribute[i].count !== vertexCount)
                    continue;
                array.push(LoopSubdivision.flatAttribute(morphAttribute[i], vertexCount));
            }
            loop.morphAttributes[attributeName] = array;
        }
        loop.morphTargetsRelative = existing.morphTargetsRelative;
        ///// Clean Up
        existing.dispose();
        return loop;
    };
    LoopSubdivision.flatAttribute = function (attribute, vertexCount) {
        var newTriangles = 4;
        var arrayLength = (vertexCount * attribute.itemSize) * newTriangles;
        var floatArray = new attribute.array.constructor(arrayLength);
        var index = 0;
        var step = attribute.itemSize;
        for (var i = 0; i < vertexCount; i += 3) {
            // Original Vertices
            _vector0.fromBufferAttribute(attribute, i + 0);
            _vector1.fromBufferAttribute(attribute, i + 1);
            _vector2.fromBufferAttribute(attribute, i + 2);
            // Midpoints
            _vec0to1.copy(_vector0).add(_vector1).divideScalar(2.0);
            _vec1to2.copy(_vector1).add(_vector2).divideScalar(2.0);
            _vec2to0.copy(_vector2).add(_vector0).divideScalar(2.0);
            // Add New Triangle Positions
            setTriangle(floatArray, index, step, _vector0, _vec0to1, _vec2to0);
            index += (step * 3);
            setTriangle(floatArray, index, step, _vector1, _vec1to2, _vec0to1);
            index += (step * 3);
            setTriangle(floatArray, index, step, _vector2, _vec2to0, _vec1to2);
            index += (step * 3);
            setTriangle(floatArray, index, step, _vec0to1, _vec1to2, _vec2to0);
            index += (step * 3);
        }
        return new THREE.BufferAttribute(floatArray, attribute.itemSize);
    };
    /////////////////////////////////////////////////////////////////////////////////////
    /////   Smooth
    ////////////////////
    /** Applies one iteration of Loop (smooth) subdivision (1 triangle split into 4 triangles) */
    LoopSubdivision.smooth = function (geometry, params) {
        if (typeof params !== 'object')
            params = {};
        ///// Parameters
        if (params.uvSmooth === undefined)
            params.uvSmooth = false;
        if (params.preserveEdges === undefined)
            params.preserveEdges = false;
        ///// Geometries
        if (!verifyGeometry(geometry))
            return geometry;
        var existing = (geometry.index !== null) ? geometry.toNonIndexed() : geometry.clone();
        var flat = LoopSubdivision.flat(existing);
        var loop = new THREE.BufferGeometry();
        ///// Attributes
        var attributeList = gatherAttributes(existing);
        var vertexCount = existing.attributes.position.count;
        var posAttribute = existing.getAttribute('position');
        var flatPosition = flat.getAttribute('position');
        var hashToIndex = {}; // Position hash mapped to index values of same position
        var existingNeighbors = {}; // Position hash mapped to existing vertex neighbors
        var flatOpposites = {}; // Position hash mapped to new edge point opposites
        var existingEdges = {};
        function addNeighbor(posHash, neighborHash, index) {
            if (!existingNeighbors[posHash])
                existingNeighbors[posHash] = {};
            if (!existingNeighbors[posHash][neighborHash])
                existingNeighbors[posHash][neighborHash] = [];
            existingNeighbors[posHash][neighborHash].push(index);
        }
        function addOpposite(posHash, index) {
            if (!flatOpposites[posHash])
                flatOpposites[posHash] = [];
            flatOpposites[posHash].push(index);
        }
        function addEdgePoint(posHash, edgeHash) {
            if (!existingEdges[posHash])
                existingEdges[posHash] = new Set();
            existingEdges[posHash].add(edgeHash);
        }
        ///// Existing Vertex Hashes
        for (var i = 0; i < vertexCount; i += 3) {
            var posHash0 = hashFromVector(_vertex[0].fromBufferAttribute(posAttribute, i + 0));
            var posHash1 = hashFromVector(_vertex[1].fromBufferAttribute(posAttribute, i + 1));
            var posHash2 = hashFromVector(_vertex[2].fromBufferAttribute(posAttribute, i + 2));
            // Neighbors (of Existing Geometry)
            addNeighbor(posHash0, posHash1, i + 1);
            addNeighbor(posHash0, posHash2, i + 2);
            addNeighbor(posHash1, posHash0, i + 0);
            addNeighbor(posHash1, posHash2, i + 2);
            addNeighbor(posHash2, posHash0, i + 0);
            addNeighbor(posHash2, posHash1, i + 1);
            // Opposites (of new FlatSubdivided vertices)
            _vec0to1.copy(_vertex[0]).add(_vertex[1]).divideScalar(2.0);
            _vec1to2.copy(_vertex[1]).add(_vertex[2]).divideScalar(2.0);
            _vec2to0.copy(_vertex[2]).add(_vertex[0]).divideScalar(2.0);
            var hash0to1 = hashFromVector(_vec0to1);
            var hash1to2 = hashFromVector(_vec1to2);
            var hash2to0 = hashFromVector(_vec2to0);
            addOpposite(hash0to1, i + 2);
            addOpposite(hash1to2, i + 0);
            addOpposite(hash2to0, i + 1);
            // Track Edges for 'edgePreserve'
            addEdgePoint(posHash0, hash0to1);
            addEdgePoint(posHash0, hash2to0);
            addEdgePoint(posHash1, hash0to1);
            addEdgePoint(posHash1, hash1to2);
            addEdgePoint(posHash2, hash1to2);
            addEdgePoint(posHash2, hash2to0);
        }
        ///// Flat Position to Index Map
        for (var i = 0; i < flat.attributes.position.count; i++) {
            var posHash = hashFromVector(_temp.fromBufferAttribute(flatPosition, i));
            if (!hashToIndex[posHash])
                hashToIndex[posHash] = [];
            hashToIndex[posHash].push(i);
        }
        ///// Build Geometry, Set Attributes
        attributeList.forEach(function (attributeName) {
            var existingAttribute = existing.getAttribute(attributeName);
            var flatAttribute = flat.getAttribute(attributeName);
            if (existingAttribute === undefined || flatAttribute === undefined)
                return;
            var floatArray = subdivideAttribute(attributeName, existingAttribute, flatAttribute);
            loop.setAttribute(attributeName, new THREE.BufferAttribute(floatArray, flatAttribute.itemSize));
        });
        ///// Morph Attributes
        var morphAttributes = existing.morphAttributes;
        for (var attributeName in morphAttributes) {
            var array = [];
            var morphAttribute = morphAttributes[attributeName];
            // Process Array of Float32BufferAttributes
            for (var i = 0, l = morphAttribute.length; i < l; i++) {
                if (morphAttribute[i].count !== vertexCount)
                    continue;
                var existingAttribute = morphAttribute[i];
                var flatAttribute = LoopSubdivision.flatAttribute(morphAttribute[i], morphAttribute[i].count);
                var floatArray = subdivideAttribute(attributeName, existingAttribute, flatAttribute);
                array.push(new THREE.BufferAttribute(floatArray, flatAttribute.itemSize));
            }
            loop.morphAttributes[attributeName] = array;
        }
        loop.morphTargetsRelative = existing.morphTargetsRelative;
        ///// Clean Up
        flat.dispose();
        existing.dispose();
        return loop;
        //////////
        // Loop Subdivide Function
        function subdivideAttribute(attributeName, existingAttribute, flatAttribute) {
            var arrayLength = (flat.attributes.position.count * flatAttribute.itemSize);
            var floatArray = new existingAttribute.array.constructor(arrayLength);
            // Process Triangles
            var index = 0;
            for (var i = 0; i < flat.attributes.position.count; i += 3) {
                var _loop_3 = function (v) {
                    if (attributeName === 'uv' && !params.uvSmooth) {
                        _vertex[v].fromBufferAttribute(flatAttribute, i + v);
                    }
                    else if (attributeName === 'normal') { // && params.normalSmooth) {
                        _position[v].fromBufferAttribute(flatPosition, i + v);
                        var positionHash = hashFromVector(_position[v]);
                        var positions = hashToIndex[positionHash];
                        var k = Object.keys(positions).length;
                        var beta_1 = 0.75 / k;
                        var startWeight = 1.0 - (beta_1 * k);
                        _vertex[v].fromBufferAttribute(flatAttribute, i + v);
                        _vertex[v].multiplyScalar(startWeight);
                        positions.forEach(function (positionIndex) {
                            _average.fromBufferAttribute(flatAttribute, positionIndex);
                            _average.multiplyScalar(beta_1);
                            _vertex[v].add(_average);
                        });
                    }
                    else { // 'position', 'color', etc...
                        _vertex[v].fromBufferAttribute(flatAttribute, i + v);
                        _position[v].fromBufferAttribute(flatPosition, i + v);
                        var positionHash = hashFromVector(_position[v]);
                        var neighbors = existingNeighbors[positionHash];
                        var opposites = flatOpposites[positionHash];
                        ///// Adjust Source Vertex
                        if (neighbors) {
                            // Check Edges have even Opposite Points
                            if (params.preserveEdges) {
                                var edgeSet = existingEdges[positionHash];
                                var hasPair = true;
                                for (var _i = 0, edgeSet_1 = edgeSet; _i < edgeSet_1.length; _i++) {
                                    var edgeHash = edgeSet_1[_i];
                                    if (flatOpposites[edgeHash].length % 2 !== 0)
                                        hasPair = false;
                                }
                                if (!hasPair)
                                    return "continue";
                            }
                            // Number of Neighbors
                            var k = Object.keys(neighbors).length;
                            ///// Loop's Formula
                            var beta = 1 / k * ((5 / 8) - Math.pow((3 / 8) + (1 / 4) * Math.cos(2 * Math.PI / k), 2));
                            ///// Warren's Formula
                            // const beta = (k > 3) ? 3 / (8 * k) : ((k === 3) ? 3 / 16 : 0);
                            ///// Stevinz' Formula
                            // const beta = 0.5 / k;
                            ///// Average with Neighbors
                            var startWeight = 1.0 - (beta * k);
                            _vertex[v].multiplyScalar(startWeight);
                            for (var neighborHash in neighbors) {
                                var neighborIndices = neighbors[neighborHash];
                                _average.set(0, 0, 0);
                                for (var j = 0; j < neighborIndices.length; j++) {
                                    _average.add(_temp.fromBufferAttribute(existingAttribute, neighborIndices[j]));
                                }
                                _average.divideScalar(neighborIndices.length);
                                _average.multiplyScalar(beta);
                                _vertex[v].add(_average);
                            }
                            ///// Newly Added Edge Vertex
                        }
                        else if (opposites && opposites.length === 2) {
                            var k = opposites.length;
                            var beta_2 = 0.125; /* 1/8 */
                            var startWeight = 1.0 - (beta_2 * k);
                            _vertex[v].multiplyScalar(startWeight);
                            opposites.forEach(function (oppositeIndex) {
                                _average.fromBufferAttribute(existingAttribute, oppositeIndex);
                                _average.multiplyScalar(beta_2);
                                _vertex[v].add(_average);
                            });
                        }
                    }
                };
                // Process Triangle Points
                for (var v = 0; v < 3; v++) {
                    _loop_3(v);
                }
                // Add New Triangle Position
                setTriangle(floatArray, index, flatAttribute.itemSize, _vertex[0], _vertex[1], _vertex[2]);
                index += (flatAttribute.itemSize * 3);
            }
            return floatArray;
        }
    };
    return LoopSubdivision;
}());
/////////////////////////////////////////////////////////////////////////////////////
/////   Local Functions, Hash
/////////////////////////////////////////////////////////////////////////////////////
var _positionShift = Math.pow(10, POSITION_DECIMALS);
/** Compares two numbers to see if they're almost the same */
function fuzzy(a, b, tolerance) {
    if (tolerance === void 0) { tolerance = 0.00001; }
    return ((a < (b + tolerance)) && (a > (b - tolerance)));
}
/** Generates hash strong from Number */
function hashFromNumber(num, shift) {
    if (shift === void 0) { shift = _positionShift; }
    var roundedNumber = round(num * shift);
    if (roundedNumber == 0)
        roundedNumber = 0; /* prevent -0 (signed 0 can effect Math.atan2(), etc.) */
    return "".concat(roundedNumber);
}
/** Generates hash strong from Vector3 */
function hashFromVector(vector, shift) {
    if (shift === void 0) { shift = _positionShift; }
    return "".concat(hashFromNumber(vector.x, shift), ",").concat(hashFromNumber(vector.y, shift), ",").concat(hashFromNumber(vector.z, shift));
}
function round(x) {
    return (x + ((x > 0) ? 0.5 : -0.5)) << 0;
}
/////////////////////////////////////////////////////////////////////////////////////
/////   Local Functions, Geometry
/////////////////////////////////////////////////////////////////////////////////////
function calcNormal(target, vec1, vec2, vec3) {
    _temp.subVectors(vec1, vec2);
    target.subVectors(vec2, vec3);
    target.cross(_temp).normalize();
}
function gatherAttributes(geometry) {
    var desired = ['position', 'normal', 'uv'];
    var contains = Object.keys(geometry.attributes);
    var attributeList = Array.from(new Set(desired.concat(contains)));
    return attributeList;
}
function setTriangle(positions, index, step, vec0, vec1, vec2) {
    if (step >= 1) {
        positions[index + 0 + (step * 0)] = vec0.x;
        positions[index + 0 + (step * 1)] = vec1.x;
        positions[index + 0 + (step * 2)] = vec2.x;
    }
    if (step >= 2) {
        positions[index + 1 + (step * 0)] = vec0.y;
        positions[index + 1 + (step * 1)] = vec1.y;
        positions[index + 1 + (step * 2)] = vec2.y;
    }
    if (step >= 3) {
        positions[index + 2 + (step * 0)] = vec0.z;
        positions[index + 2 + (step * 1)] = vec1.z;
        positions[index + 2 + (step * 2)] = vec2.z;
    }
    if (step >= 4) {
        positions[index + 3 + (step * 0)] = vec0.w;
        positions[index + 3 + (step * 1)] = vec1.w;
        positions[index + 3 + (step * 2)] = vec2.w;
    }
}
function verifyGeometry(geometry) {
    if (geometry === undefined) {
        console.warn("LoopSubdivision: Geometry provided is undefined");
        return false;
    }
    if (!geometry.isBufferGeometry) {
        console.warn("LoopSubdivision: Geometry provided is not 'BufferGeometry' type");
        return false;
    }
    if (geometry.attributes.position === undefined) {
        console.warn("LoopSubdivision: Geometry provided missing required 'position' attribute");
        return false;
    }
    if (geometry.attributes.normal === undefined) {
        geometry.computeVertexNormals();
    }
    return true;
}
//# sourceMappingURL=threesub.js.map