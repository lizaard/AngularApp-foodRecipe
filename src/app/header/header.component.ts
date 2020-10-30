import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isAuthentificated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthentificated = !!user;
        console.log(!user);
        console.log(!!user);

      }
    );
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
    this.route.navigate(['/auth']);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
