import { ReactNode } from "react";

export const RenderIf = ( condition: boolean, component: ReactNode ) => {
    if (condition) {
        return (
            <>{ component }</>
        )
    }

    return null
}