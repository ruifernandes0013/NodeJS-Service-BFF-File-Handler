
import { Health } from '../domain/Health';
import { HealthDTO } from '../dtos/HealthDTO';

export class HealthMap {
    public static toDomain(raw: any): Health {
        const healthOrError = Health.create({
            uptime: raw.uptime,
            freeMemory: raw.freeMemory,
            usedMemory: raw.usedMemory,
            totalMemory: raw.totalMemory,
            cpuLoad: raw.cpuLoad,
            cores: raw.cores,
        });

        if (healthOrError.isFailure) {
            console.log(`[ClientBasicMap]: Error: ${healthOrError.getErrorMessage()}`);
            throw new Error(`[ClientBasicMap]: Error: ${healthOrError.getErrorMessage()}`);
        }

        return healthOrError.getValue();
    }

    public static toDTO(health: Health): HealthDTO {
        return {
            uptime: health.uptime,
            freeMemory: health.freeMemory,
            usedMemory: health.usedMemory,
            totalMemory: health.totalMemory,
            cpuLoad: health.cpuLoad,
            cores: health.cores,
        };
    }
}
