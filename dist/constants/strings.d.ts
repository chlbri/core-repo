import { FinalStates } from '../types/crud/config';
export declare const STATE_VALUES_CRUD: {
    readonly object: {
        idle: "idle";
        information: "information";
        success: "success";
        redirect: "redirect";
        client: "client";
        server: "server";
        permission: "permission";
        timeout: "timeout";
    };
    readonly array: ["information", "success", "redirect", "client", "server", "permission", "timeout", "idle"];
};
export declare const STATESF_CRUD: {
    readonly object: {
        information: "information";
        success: "success";
        redirect: "redirect";
        client: "client";
        server: "server";
        permission: "permission";
        timeout: "timeout";
    };
    readonly array: ["information", "success", "redirect", "client", "server", "permission", "timeout"];
};
export declare const ACTIONS_CRUD: {
    readonly object: {
        __increment: "__increment";
        __assignRequest: "__assignRequest";
    };
    readonly array: ["__increment", "__assignRequest"];
};
export declare const STATES_FINAL: FinalStates;
export declare const STATES_COMMON_CRUD: {
    readonly object: {
        empty_db: "empty_db";
        empty_ids: "empty_ids";
        empty_filters: "empty_filters";
        options_limit: "options_limit";
        check_options_limit: "check_options_limit";
        no_options_limit: "no_options_limit";
        limit_reached: "limit_reached";
        filters_limit: "filters_limit";
    };
    readonly array: ["empty_db", "empty_ids", "empty_filters", "options_limit", "check_options_limit", "no_options_limit", "limit_reached", "filters_limit"];
};
export declare const ERRORS_STRING: {
    readonly object: {
        no_machine_states: "no_machine_states";
        empty_states: "empty_states";
        actions_internal: "actions_internal";
        states_internal: "states_internal";
        context_exits: "context_exits";
    };
    readonly array: ["no_machine_states", "empty_states", "actions_internal", "states_internal", "context_exits"];
};
