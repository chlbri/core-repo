export declare const xstate: "xstate";
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
        __information: "__information";
        __success: "__success";
        __redirect: "__redirect";
        __client: "__client";
        __server: "__server";
        __permission: "__permission";
        __timeout: "__timeout";
    };
    readonly array: ["__increment", "__assignRequest", "__information", "__success", "__redirect", "__client", "__server", "__permission", "__timeout"];
};
export declare const STATES_FINAL: {
    readonly information: {
        readonly entry: readonly ["__information", "__increment"];
        readonly type: "final";
    };
    readonly success: {
        readonly entry: readonly ["__success", "__increment"];
        readonly type: "final";
    };
    readonly redirect: {
        readonly entry: readonly ["__redirect", "__increment"];
        readonly type: "final";
    };
    readonly client: {
        readonly entry: readonly ["__client", "__increment"];
        readonly type: "final";
    };
    readonly server: {
        readonly entry: readonly ["__server", "__increment"];
        readonly type: "final";
    };
    readonly permission: {
        readonly entry: readonly ["__permission", "__increment"];
        readonly type: "final";
    };
    readonly timeout: {
        readonly entry: readonly ["__timeout", "__increment"];
        readonly type: "final";
    };
};
export declare const STATES_COMMON_CRUD: {
    readonly object: {
        checking: "checking";
        empty_db: "empty_db";
        empty_ids: "empty_ids";
        empty_by_filters: "empty_by_filters";
        options_limit: "options_limit";
        check_options_limit: "check_options_limit";
        check_filters_limit: "check_filters_limit";
        no_options_limit: "no_options_limit";
        limit_reached: "limit_reached";
        filters_limit: "filters_limit";
    };
    readonly array: ["checking", "empty_db", "empty_ids", "empty_by_filters", "options_limit", "check_options_limit", "check_filters_limit", "no_options_limit", "limit_reached", "filters_limit"];
};
export declare const ERRORS_STRING: {
    readonly object: {
        no_machine_states: "no_machine_states";
        initial_exists: "initial_exists";
        empty_states: "empty_states";
        actions_internal: "actions_internal";
        states_internal: "states_internal";
        no_checking: "no_checking";
        context_exits: "context_exits";
    };
    readonly array: ["no_machine_states", "initial_exists", "empty_states", "actions_internal", "states_internal", "no_checking", "context_exits"];
};
