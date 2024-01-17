import { GetHealthController } from "./GetHealthController";
import { GetHealthUseCase } from "./GetHealthUseCase";

const getHealthUseCase = new GetHealthUseCase();
const getHealthController = new GetHealthController(getHealthUseCase);

export { getHealthController };
