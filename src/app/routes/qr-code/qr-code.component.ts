import {Component, OnInit} from '@angular/core';
import {MediatorService} from "../../services/mediator.service";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})

export class QrCodeComponent implements OnInit {

  constructor(public mediator: MediatorService) {
  }

  ngOnInit(): void {
  }
}
