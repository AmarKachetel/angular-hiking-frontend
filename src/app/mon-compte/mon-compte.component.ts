import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
@Component({
  selector: 'app-mon-compte',
  standalone: true,
  imports: [],
  templateUrl: './mon-compte.component.html',
  styleUrl: './mon-compte.component.less'
})
export class MonCompteComponent implements OnInit {

  username: string | null = null;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.username = this.sessionService.getUsername(); // Récupère le nom d'utilisateur depuis le service de session
  }
}
