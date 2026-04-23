module cornerstone::corner_key {
    public struct CornerKey has key, store {
        id: UID,
        key_type: u8,
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        event_limited: bool,
        expires_at_ms: u64,
    }

    public fun corner_ama_type(): u8 {
        0
    }

    public fun priority_merch_type(): u8 {
        1
    }

    public fun arena_access_type(): u8 {
        2
    }

    public fun issue_corner_ama_key(
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        event_limited: bool,
        expires_at_ms: u64,
        ctx: &mut TxContext
    ): CornerKey {
        issue(
            corner_ama_type(),
            athlete_id,
            event_id,
            event_limited,
            expires_at_ms,
            ctx
        )
    }

    public fun issue_priority_merch_key(
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        event_limited: bool,
        expires_at_ms: u64,
        ctx: &mut TxContext
    ): CornerKey {
        issue(
            priority_merch_type(),
            athlete_id,
            event_id,
            event_limited,
            expires_at_ms,
            ctx
        )
    }

    public fun issue_arena_access_key(
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        event_limited: bool,
        expires_at_ms: u64,
        ctx: &mut TxContext
    ): CornerKey {
        issue(
            arena_access_type(),
            athlete_id,
            event_id,
            event_limited,
            expires_at_ms,
            ctx
        )
    }

    public fun key_type(key: &CornerKey): u8 {
        key.key_type
    }

    public fun is_event_limited(key: &CornerKey): bool {
        key.event_limited
    }

    public fun expires_at_ms(key: &CornerKey): u64 {
        key.expires_at_ms
    }

    public fun destroy(key: CornerKey) {
        let CornerKey {
            id,
            key_type: _,
            athlete_id: _,
            event_id: _,
            event_limited: _,
            expires_at_ms: _,
        } = key;

        object::delete(id);
    }

    fun issue(
        key_type: u8,
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        event_limited: bool,
        expires_at_ms: u64,
        ctx: &mut TxContext
    ): CornerKey {
        CornerKey {
            id: object::new(ctx),
            key_type,
            athlete_id,
            event_id,
            event_limited,
            expires_at_ms,
        }
    }
}
