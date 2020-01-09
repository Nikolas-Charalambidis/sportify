import React from 'react';
import {MatchCreateParent} from "../../../organisms/match/admin/create/MatchCreateParent";
import {MatchCreateFormBreadcrumbs} from "../../../organisms/breadcrumbs/MatchCreateFormBreadcrumbs";

export function MatchCreateForm() {
    return (
        <div>
            <MatchCreateFormBreadcrumbs />
            <MatchCreateParent interactive={false} />
        </div>
    );
}
