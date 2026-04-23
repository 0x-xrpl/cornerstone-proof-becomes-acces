module cornerstone::squad_unlock {
    public struct SquadUnlock has key, store {
        id: UID,
        title: vector<u8>,
        region: vector<u8>,
        progress: u64,
        target: u64,
        active: bool,
    }

    public fun create(
        title: vector<u8>,
        region: vector<u8>,
        target: u64,
        ctx: &mut TxContext
    ): SquadUnlock {
        SquadUnlock {
            id: object::new(ctx),
            title,
            region,
            progress: 0,
            target,
            active: true,
        }
    }

    public fun increment_progress(squad: &mut SquadUnlock, amount: u64) {
        squad.progress = squad.progress + amount;
    }

    public fun deactivate(squad: &mut SquadUnlock) {
        squad.active = false;
    }

    public fun is_complete(squad: &SquadUnlock): bool {
        squad.progress >= squad.target
    }

    public fun progress(squad: &SquadUnlock): u64 {
        squad.progress
    }

    public fun destroy(squad: SquadUnlock) {
        let SquadUnlock {
            id,
            title: _,
            region: _,
            progress: _,
            target: _,
            active: _,
        } = squad;

        object::delete(id);
    }
}
