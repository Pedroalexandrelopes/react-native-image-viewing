/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useCallback } from "react";
const DOUBLE_TAP_DELAY = 300;
let lastTapTS = null;
let timer;
/**
 * This is iOS only.
 * Same functionality for Android implemented inside usePanResponder hook.
 */
function useDoubleTapToZoom(scrollViewRef, scaled, onSingleTap, screen) {
    const handleDoubleTap = useCallback((event) => {
        var _a, _b, _c;
        const nowTS = new Date().getTime();
        const scrollResponderRef = (_b = (_a = scrollViewRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getScrollResponder();
        const checkSingleTap = function () {
            timer = setTimeout(() => {
                lastTapTS = null;
                onSingleTap(event);
            }, DOUBLE_TAP_DELAY + 1);
        };
        if (lastTapTS && nowTS - lastTapTS < DOUBLE_TAP_DELAY) {
            timer && clearTimeout(timer);
            const { pageX, pageY } = event.nativeEvent;
            let targetX = 0;
            let targetY = 0;
            let targetWidth = screen.width;
            let targetHeight = screen.height;
            // Zooming in
            // TODO: Add more precise calculation of targetX, targetY based on touch
            if (!scaled) {
                targetX = pageX / 2;
                targetY = pageY / 2;
                targetWidth = screen.width / 2;
                targetHeight = screen.height / 2;
            }
            // @ts-ignore
            (_c = scrollResponderRef) === null || _c === void 0 ? void 0 : _c.scrollResponderZoomTo({
                x: targetX,
                y: targetY,
                width: targetWidth,
                height: targetHeight,
                animated: true,
            });
        }
        else {
            lastTapTS = nowTS;
            checkSingleTap();
        }
    }, [scaled]);
    return handleDoubleTap;
}
export default useDoubleTapToZoom;
