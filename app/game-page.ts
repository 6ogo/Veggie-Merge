import { EventData, Page, GestureEventData, PanGestureEventData, GridLayout } from '@nativescript/core';
import { GameService } from './services/game-service';

let gameService: GameService;
let draggedVegetable: any = null;

export function navigatingTo(args: EventData) {
    try {
        const page = <Page>args.object;
        if (!gameService) {
            gameService = new GameService();
        }
        page.bindingContext = gameService;

        // Set up touch handling
        const gameGrid = page.getViewById('gameGrid');
        if (gameGrid) {
            setupGameGridInteractions(gameGrid);
        }
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

function setupGameGridInteractions(gameGrid: GridLayout) {
    gameGrid.on('tap', (args: GestureEventData) => {
        try {
            if (!args) return;
            const location = args.getLocationInView();
            if (location) {
                gameService.addVegetable({ 
                    x: Math.max(25, Math.min(location.x, gameGrid.getMeasuredWidth() - 25)),
                    y: Math.max(25, Math.min(location.y, gameGrid.getMeasuredHeight() - 25))
                });
            }
        } catch (error) {
            console.error('Tap handling error:', error);
        }
    });

    gameGrid.on('pan', (args: PanGestureEventData) => {
        try {
            // Basic pan handling - to be implemented
            console.log('Pan gesture detected');
        } catch (error) {
            console.error('Pan handling error:', error);
        }
    });
}

export function onShowLeaderboard() {
    // Navigate to leaderboard page - to be implemented
}