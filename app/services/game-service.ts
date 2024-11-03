import { Observable } from '@nativescript/core';
import { Vegetable, VegetableType, Score } from '../models/vegetable';
import { v4 as uuidv4 } from 'uuid';

export class GameService extends Observable {
    private _score: number = 0;
    private _vegetables: Vegetable[] = [];
    private _dailyScores: Score[] = [];
    private _weeklyScores: Score[] = [];
    private _monthlyScores: Score[] = [];

    constructor() {
        super();
        try {
            this.loadScores();
            // Initialize with observable properties
            this.notifyPropertyChange('score', this._score);
            this.notifyPropertyChange('vegetables', this._vegetables);
        } catch (error) {
            console.error('GameService initialization error:', error);
            // Set default values in case of error
            this._score = 0;
            this._vegetables = [];
        }
    }

    get score(): number {
        return this._score;
    }

    get vegetables(): Vegetable[] {
        return this._vegetables;
    }

    addVegetable(position: { x: number; y: number }) {
        try {
            const types = Object.values(VegetableType);
            const randomType = types[Math.floor(Math.random() * types.length)];
            
            const vegetable: Vegetable = {
                id: uuidv4(),
                type: randomType,
                size: 1,
                position: {
                    x: Math.round(position.x),
                    y: Math.round(position.y)
                }
            };

            this._vegetables.push(vegetable);
            this.notifyPropertyChange('vegetables', [...this._vegetables]);
        } catch (error) {
            console.error('Error adding vegetable:', error);
        }
    }

    mergeVegetables(veg1: Vegetable, veg2: Vegetable) {
        try {
            if (!veg1 || !veg2 || veg1.type !== veg2.type || veg1.size !== veg2.size) return;

            const newSize = veg1.size + 1;
            const points = Math.pow(2, newSize) * 10;

            if (newSize >= 5) {
                // Pop the vegetables
                this._score += points * 2;
                this._vegetables = this._vegetables.filter(v => v.id !== veg1.id && v.id !== veg2.id);
            } else {
                // Merge vegetables
                this._score += points;
                this._vegetables = this._vegetables.filter(v => v.id !== veg2.id);
                veg1.size = newSize;
            }

            this.notifyPropertyChange('vegetables', [...this._vegetables]);
            this.notifyPropertyChange('score', this._score);
            this.updateLeaderboards();
        } catch (error) {
            console.error('Error merging vegetables:', error);
        }
    }

    private updateLeaderboards() {
        try {
            const now = Date.now();
            const score: Score = { points: this._score, timestamp: now };

            // Update daily scores
            this._dailyScores.push(score);
            this._dailyScores = this._dailyScores
                .filter(s => now - s.timestamp < 24 * 60 * 60 * 1000)
                .sort((a, b) => b.points - a.points)
                .slice(0, 10);

            // Update weekly scores
            this._weeklyScores.push(score);
            this._weeklyScores = this._weeklyScores
                .filter(s => now - s.timestamp < 7 * 24 * 60 * 60 * 1000)
                .sort((a, b) => b.points - a.points)
                .slice(0, 10);

            // Update monthly scores
            this._monthlyScores.push(score);
            this._monthlyScores = this._monthlyScores
                .filter(s => now - s.timestamp < 30 * 24 * 60 * 60 * 1000)
                .sort((a, b) => b.points - a.points)
                .slice(0, 10);

            this.saveScores();
        } catch (error) {
            console.error('Error updating leaderboards:', error);
        }
    }

    private loadScores() {
        // In a real app, you'd load from a backend service
        // This is just a simple implementation
        this._dailyScores = [];
        this._weeklyScores = [];
        this._monthlyScores = [];
    }

    private saveScores() {
        // In a real app, you'd save to a backend service
        // This is just a simple implementation
        console.log('Scores saved');
    }
}