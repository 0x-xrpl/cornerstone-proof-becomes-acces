module cornerstone::access_rules {
    public struct UnlockRule has copy, drop, store {
        key_type: u8,
        requires_watch_check_in: bool,
        requires_venue_check_in: bool,
        requires_quiz_pass: bool,
        minimum_count: u64,
        event_limited: bool,
    }

    public fun new_rule(
        key_type: u8,
        requires_watch_check_in: bool,
        requires_venue_check_in: bool,
        requires_quiz_pass: bool,
        minimum_count: u64,
        event_limited: bool
    ): UnlockRule {
        UnlockRule {
            key_type,
            requires_watch_check_in,
            requires_venue_check_in,
            requires_quiz_pass,
            minimum_count,
            event_limited,
        }
    }

    public fun can_unlock(
        rule: &UnlockRule,
        has_watch_check_in: bool,
        has_venue_check_in: bool,
        has_quiz_pass: bool,
        recognized_count: u64
    ): bool {
        recognized_count >= rule.minimum_count &&
        (!rule.requires_watch_check_in || has_watch_check_in) &&
        (!rule.requires_venue_check_in || has_venue_check_in) &&
        (!rule.requires_quiz_pass || has_quiz_pass)
    }

    public fun key_type(rule: &UnlockRule): u8 {
        rule.key_type
    }
}
