import { test, expect } from '@playwright/test';
import PlayListPage from '../src/pageObjects/PlaylistPage/PlaylistPage';
import { mmssToSeconds } from '../src/utils/time';

test.describe('UI Playlist tests', () => {
    let playList;
    const expectedTrack = 'Winter Winds';

    test.beforeEach(async ({ page }) => {
        playList = new PlayListPage(page);
        await playList.navigate();
    });

    test('[ID-1] Search Functionality', async () => {
        await playList.searchInput.fill(expectedTrack);

        await expect(playList.tracks, 'Playlist contains exactly one track').toHaveCount(1);
        await expect(playList.tracks, `Your Playlist contains expected track: "${expectedTrack}"`).toContainText(expectedTrack);
    });

    test('[ID-2] Add Track Using "+" Button', async () => {
        await playList.addTrackByButton(expectedTrack);

        await expect(playList.yourPlaylist, 'Your Playlist contains exactly one track').toHaveCount(1);
        await expect(playList.yourPlaylist, `Your Playlist contains expected track: "${expectedTrack}"`).toContainText(expectedTrack);
    });

    test('[ID-3] Verify Total Duration of the Playlist in Seconds', async () => {
        const tracks = ['Summer Breeze', 'Autumn Leaves', 'Winter Winds', 'Spring Dance', 'Rainy Mood'];

        for (const name of tracks) {
            await playList.addTrackByButton(name);
        }

        let expectedSeconds = 0;
        for (const name of tracks) {
            const mmss = await playList.getPlaylistTrackDurationMmss(name);
            expectedSeconds += mmssToSeconds(mmss);
        }

        const uiSeconds = await playList.getTotalDurationSeconds();
        await expect(uiSeconds, 'Total playlist duration is calculated correctly').toBe(expectedSeconds);
    });
});
