import { EventData, Page } from '@nativescript/core';
import { GameService } from './services/game-service';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new GameService();
}