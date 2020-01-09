import React from 'react';
import {MatchCreateParent} from "../../../organisms/match/admin/create/MatchCreateParent";
import {MatchCreateInteractiveBreadcrumbs} from "../../../organisms/breadcrumbs/MatchCreateInteractiveBreadcrumbs";

export function MatchCreateInteractive() {
    return (
        <div>
            <MatchCreateInteractiveBreadcrumbs />
            <MatchCreateParent interactive={true} />
        </div>
    );
}
