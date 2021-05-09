import { Injectable } from '@angular/core';
import { Community } from '../model/community';

const filePath = 'src/assets/communities.json';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
    private mockCommunities: Community[] =
        [
            {
                name: 'Pontificia Universidad Javeriana',
                size: 20000
            },
            {
                name: 'Bogota, Colombia',
                size: 15000000
            }];
  constructor() { }

    public getCommunities(): Community[]{
        return this.mockCommunities;
    }
}
