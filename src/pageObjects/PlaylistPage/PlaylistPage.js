export default class PlayListPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByLabel('Search');
        this.trackList = page.locator('#tracklist');
        this.tracks = this.trackList.locator('.MuiGrid-container');
        this.yourPlaylist = page.locator('#playlist');
        this.playlistTracks = this.yourPlaylist.locator('.MuiGrid-container');
        this.playlistDuration = page.locator('#playlist-duration');
    }

    async navigate() {
        await this.page.goto('/');
    }

    getCatalogTrackByName(trackName) {
        return this.tracks.filter({ hasText: trackName });
    }

    async addTrackByButton(trackName) {
        const trackRow = this.getCatalogTrackByName(trackName);
        await trackRow.getByRole('button', { name: '+' }).click();
    }

    getPlaylistTrackRowByName(trackName) {
        return this.playlistTracks.filter({ hasText: trackName });
    }

    async getPlaylistTrackDurationMmss(trackName) {
        const row = this.getPlaylistTrackRowByName(trackName);
        const duration = row
            .locator('p')
            .filter({ hasText: /^\d{2}:\d{2}$/ })
            .first();

        return (await duration.innerText()).trim();
    }

    async getTotalDurationSeconds() {
        return Number((await this.playlistDuration.innerText()).trim());
    }
}
