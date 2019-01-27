import { Component, OnInit } from "@angular/core";
import APP_CONFIG from "../../app.config";
import { Injectable } from "@angular/core";
import { Node, Link } from "../../d3";
import { HttpClient } from "@angular/common/http";
import { RequestService } from "src/app/service/request.service";

@Component({
  selector: "app-balls",
  templateUrl: "./balls.component.html",
  styleUrls: ["./balls.component.scss"]
})
@Injectable({ providedIn: "root" })
export class BallsComponent implements OnInit {
  nodes: Node[] = [];
  links: Link[] = [];

  ngOnInit() {
    let baseCurrency = "EUR";
    this.service.getCurrentData(baseCurrency).subscribe(data => {
      console.log(data);
    });
  }

  constructor(private service: RequestService) {
    const N = APP_CONFIG.N,
      getIndex = (number: any) => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i.toString()));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
  }
}
