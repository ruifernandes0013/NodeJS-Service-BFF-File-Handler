import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface HealthProps {
    uptime: number;
    freeMemory: number;
    usedMemory: number;
    totalMemory: number;
    cpuLoad: number[];
    cores: number;
}

export class Health extends Entity<HealthProps> {
    get uptime(): number {
        return this.props.uptime;
    }
    get freeMemory(): number {
        return this.props.freeMemory;
    }
    get usedMemory(): number {
        return this.props.usedMemory;
    }
    get totalMemory(): number {
        return this.props.totalMemory;
    }
    get cpuLoad(): number[] {
        return this.props.cpuLoad;
    }
    get cores(): number {
        return this.props.cores;
    }

    private constructor(props: HealthProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: HealthProps, id?: UniqueEntityID): Result<Health> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argumentName: 'uptime', argument: props.uptime },
            { argumentName: 'freeMemory', argument: props.freeMemory },
            { argumentName: 'usedMemory', argument: props.usedMemory },
            { argumentName: 'totalMemory', argument: props.totalMemory },
            { argumentName: 'cpuLoad', argument: props.cpuLoad },
            { argumentName: 'cores', argument: props.cores },
        ]);

        if (!guard.succeeded) {
            return Result.fail<Health>(`[Health]: ${guard.message}`);
        }

        return Result.ok<Health>(new Health(props, id));
    }
}
