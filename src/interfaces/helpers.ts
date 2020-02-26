export interface iPath {
    raw : string,
    data: Object,
}

export interface iGuardData {
    route                   : Object,
    router                  : Object,
    context                 : Object,
}

export interface iGuardObject {
    dependencyCheck (value : string | string[]) : Promise<boolean>,
    passive         ()                          : Promise<boolean>,
}