var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var VRButton = /** @class */ (function () {
    function VRButton() {
    }
    VRButton.createButton = function (renderer, scene, camera, ret) {
        var button = document.createElement('button');
        function showEnterVR( /*device*/) {
            var currentSession = null;
            function onSessionStarted(session) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                session.addEventListener('end', onSessionEnded);
                                return [4 /*yield*/, renderer.xr.setSession(session)];
                            case 1:
                                _a.sent();
                                button.textContent = 'EXIT VR';
                                currentSession = session;
                                return [2 /*return*/];
                        }
                    });
                });
            }
            function onSessionEnded( /*event*/) {
                currentSession.removeEventListener('end', onSessionEnded);
                button.textContent = 'ENTER VR';
                currentSession = null;
            }
            //
            button.style.display = '';
            button.style.cursor = 'pointer';
            button.style.left = 'calc(50% - 75px)';
            button.style.width = '150px';
            button.textContent = 'ENTER VR';
            button.onmouseenter = function () {
                button.style.opacity = '1.0';
            };
            button.onmouseleave = function () {
                button.style.opacity = '0.5';
            };
            button.onclick = function () {
                if (currentSession === null) {
                    // WebXR's requestReferenceSpace only works if the corresponding feature
                    // was requested at session creation time. For simplicity, just ask for
                    // the interesting ones as optional features, but be aware that the
                    // requestReferenceSpace call will fail if it turns out to be unavailable.
                    // ('local' is always available for immersive sessions and doesn't need to
                    // be requested separately.)
                    var sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] };
                    navigator.xr.requestSession('immersive-vr', sessionInit).then(onSessionStarted);
                    renderer.xr.enabled = true;
                    renderer.setAnimationLoop(function () {
                        renderer.render(scene, camera);
                    });
                    ret("enter");
                }
                else {
                    renderer.xr.enabled = false;
                    renderer.setAnimationLoop = null;
                    currentSession.end();
                    ret("exit");
                }
            };
        }
        function disableButton() {
            button.style.display = '';
            button.style.cursor = 'auto';
            button.style.left = 'calc(50% - 100px)';
            button.style.width = '200px';
            button.style.borderRadius = "50px";
            button.style.padding = "8px";
            button.onmouseenter = null;
            button.onmouseleave = null;
            button.onclick = null;
        }
        function showWebXRNotFound() {
            disableButton();
            button.textContent = 'VR NOT SUPPORTED';
        }
        function showVRNotAllowed(exception) {
            disableButton();
            console.warn('Exception when trying to call xr.isSessionSupported', exception);
            button.textContent = 'VR NOT ALLOWED';
        }
        function stylizeElement(element) {
            element.style.position = 'absolute';
            element.style.bottom = '20px';
            element.style.padding = '8px';
            element.style.border = '1px solid #fff';
            element.style.borderRadius = '50px';
            element.style.background = 'rgba(0,0,0,0.1)';
            element.style.color = '#fff';
            element.style.font = 'normal 13px sans-serif';
            element.style.textAlign = 'center';
            element.style.opacity = '0.5';
            element.style.outline = 'none';
            element.style.zIndex = '999';
        }
        if ('xr' in navigator) {
            button.id = 'VRButton';
            button.style.display = 'none';
            stylizeElement(button);
            navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {
                supported ? showEnterVR() : showWebXRNotFound();
                if (supported && VRButton.xrSessionIsGranted) {
                    button.click();
                }
            }).catch(showVRNotAllowed);
            return button;
        }
        else {
            var message = document.createElement('a');
            if (window.isSecureContext === false) {
                message.href = document.location.href.replace(/^http:/, 'https:');
                message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message
            }
            else {
                message.href = 'https://immersiveweb.dev/';
                message.innerHTML = 'WEBXR NOT AVAILABLE';
            }
            message.style.left = 'calc(50% - 90px)';
            message.style.width = '180px';
            message.style.textDecoration = 'none';
            stylizeElement(message);
            return message;
        }
    };
    VRButton.registerSessionGrantedListener = function () {
        if ('xr' in navigator) {
            // WebXRViewer (based on Firefox) has a bug where addEventListener
            // throws a silent exception and aborts execution entirely.
            if (/WebXRViewer\//i.test(navigator.userAgent))
                return;
            navigator.xr.addEventListener('sessiongranted', function () {
                VRButton.xrSessionIsGranted = true;
            });
        }
    };
    VRButton.xrSessionIsGranted = false;
    return VRButton;
}());
VRButton.registerSessionGrantedListener();
//# sourceMappingURL=vrbutton.js.map