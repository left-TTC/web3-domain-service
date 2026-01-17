


export type DeviceType = "mobile" | "desktop";

export function getDeviceTypeByUA(): DeviceType {
    const ua = navigator.userAgent.toLowerCase();

    if (/android|iphone|ipad|ipod|mobile/.test(ua)) {
        return "mobile";
    }
    return "desktop";
}