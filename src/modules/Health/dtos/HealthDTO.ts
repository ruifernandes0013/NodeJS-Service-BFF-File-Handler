export interface HealthDTO {
    uptime: number;
    freeMemory: number;
    usedMemory: number;
    totalMemory: number;
    cpuLoad: number[];
    cores: number;
}