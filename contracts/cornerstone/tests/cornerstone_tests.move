#[test_only]
module cornerstone::cornerstone_tests {
    use cornerstone::access_rules;
    use cornerstone::corner_key;
    use cornerstone::squad_unlock;
    use cornerstone::support_proof;

    #[test]
    fun issues_proof_and_key() {
        let mut ctx = tx_context::dummy();

        let proof = support_proof::issue_watch_check_in(b"ath-1", b"event-1", 100, &mut ctx);
        let key = corner_key::issue_corner_ama_key(b"ath-1", b"event-1", true, 200, &mut ctx);

        assert!(support_proof::proof_type(&proof) == support_proof::watch_check_in_type(), 0);
        assert!(corner_key::key_type(&key) == corner_key::corner_ama_type(), 1);
        assert!(corner_key::is_event_limited(&key), 2);

        support_proof::destroy(proof);
        corner_key::destroy(key);
    }

    #[test]
    fun evaluates_unlock_rule_and_squad_progress() {
        let mut ctx = tx_context::dummy();
        let rule = access_rules::new_rule(0, true, false, true, 2, true);
        let mut squad = squad_unlock::create(b"ONE SAMURAI Japan Unlock", b"Japan", 1000, &mut ctx);

        assert!(access_rules::can_unlock(&rule, true, false, true, 2), 3);
        assert!(!access_rules::can_unlock(&rule, true, false, false, 2), 4);

        squad_unlock::increment_progress(&mut squad, 750);
        assert!(squad_unlock::progress(&squad) == 750, 5);
        assert!(!squad_unlock::is_complete(&squad), 6);

        squad_unlock::increment_progress(&mut squad, 250);
        assert!(squad_unlock::is_complete(&squad), 7);

        squad_unlock::destroy(squad);
    }
}
