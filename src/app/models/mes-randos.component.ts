import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandoService } from '../services/rando.service';
import { Rando } from '../models/rando.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-mes-randos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mes-randos.component.html',
  styleUrl: './mes-randos.component.less'
})
export class MesRandosComponent {

}
