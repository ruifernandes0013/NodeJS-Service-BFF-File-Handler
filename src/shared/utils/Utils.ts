export class Utils {
    static bytesToGigabytes(bytes: number): number {
        return bytes / Math.pow(1024, 3);
    }
}
