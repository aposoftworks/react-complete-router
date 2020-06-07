/// <reference types="react" />
export default function Router({ basepath, guards, sticky, ...props }: {
    [x: string]: any;
    basepath?: string | undefined;
    guards?: {} | undefined;
    sticky?: boolean | undefined;
}): JSX.Element;
