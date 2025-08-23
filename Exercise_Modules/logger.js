export default function log(message) {
    console.log(`[LOG]: ${message}`);
}
export function error(message) {
    console.error(`[ERROR]: ${message}`);
}
export function warn(message) {
    console.warn(`[WARN]: ${message}`);
}
export function info(message) {
    console.info(`[INFO]: ${message}`);
}
