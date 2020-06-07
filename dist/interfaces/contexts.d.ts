import { iRoute } from "./components";
export default interface iRouterContext {
    processRoute(data: iRoute): boolean | Object;
    redirect(to: string): void;
    mimic(guard: string, data?: Object): boolean | Object;
    current: string;
    data?: Object;
    basepath: string;
}
