import { ReactNode } from "react";

export const ToggleRender = ( condition: boolean, ifTrueComponent: ReactNode, ifFalseComponent: ReactNode ) => {
    if (condition) {
        return <>{ ifTrueComponent }</>
    }

    return <>{ ifFalseComponent }</>
}