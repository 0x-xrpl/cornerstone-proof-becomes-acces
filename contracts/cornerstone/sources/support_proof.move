module cornerstone::support_proof {
    public struct SupportProof has key, store {
        id: UID,
        proof_type: u8,
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        earned_at_ms: u64,
    }

    public fun watch_check_in_type(): u8 {
        0
    }

    public fun venue_check_in_type(): u8 {
        1
    }

    public fun quiz_pass_type(): u8 {
        2
    }

    public fun issue_watch_check_in(
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        earned_at_ms: u64,
        ctx: &mut TxContext
    ): SupportProof {
        issue(watch_check_in_type(), athlete_id, event_id, earned_at_ms, ctx)
    }

    public fun issue_venue_check_in(
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        earned_at_ms: u64,
        ctx: &mut TxContext
    ): SupportProof {
        issue(venue_check_in_type(), athlete_id, event_id, earned_at_ms, ctx)
    }

    public fun issue_quiz_pass(
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        earned_at_ms: u64,
        ctx: &mut TxContext
    ): SupportProof {
        issue(quiz_pass_type(), athlete_id, event_id, earned_at_ms, ctx)
    }

    public fun proof_type(proof: &SupportProof): u8 {
        proof.proof_type
    }

    public fun earned_at_ms(proof: &SupportProof): u64 {
        proof.earned_at_ms
    }

    public fun destroy(proof: SupportProof) {
        let SupportProof {
            id,
            proof_type: _,
            athlete_id: _,
            event_id: _,
            earned_at_ms: _,
        } = proof;

        object::delete(id);
    }

    fun issue(
        proof_type: u8,
        athlete_id: vector<u8>,
        event_id: vector<u8>,
        earned_at_ms: u64,
        ctx: &mut TxContext
    ): SupportProof {
        SupportProof {
            id: object::new(ctx),
            proof_type,
            athlete_id,
            event_id,
            earned_at_ms,
        }
    }
}
