import React, { MouseEvent, Component } from "react";

import { Content } from "./components/Content/content";
import { NavButton } from "./components/NavButton/navButton";
import { pages } from "./data/pages";
import * as cars from "./data/cars";
import "./App.css";

import { IEntity, IPages } from "./common/interfaces";

interface IModel extends IEntity {
  brandId: number;
  availableEngineIds: number[];
  availableGearsIds: number[];
}

interface IAppState {
  pageId: number;
  content: IEntity[];
  summary: number[];
}

interface ICars {
  brand: IEntity[];
  model: IModel[];
  engine: IEntity[];
  gear: IEntity[];
}

interface IIndexedObject {
  [s: string]: IEntity[];
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pageId: 0,
      content: [],
      summary: [],
    };
  }

  cars: IIndexedObject = { ...cars };
  // cars: any = { ...cars };
  pages: IPages[] = pages;

  public componentDidMount(): void {
    this.setState(() => ({
      content: this.getContent(0),
    }));
  }

  public onClickFwd = () => {
    this.setState((prevState) => ({
      pageId: prevState.pageId + 1,
      content: this.getContent(prevState.pageId + 1),
    }));
  }

  public onClickBack = () => {
    this.setState((prevState) => ({
      pageId: prevState.pageId - 1,
      content: this.getContent(prevState.pageId - 1),
    }));
  }

  public onItemClick = (e: MouseEvent<HTMLLIElement>) => {
    const id: number = Number((e.target as HTMLInputElement).value);
    if (this.state.pageId < this.pages.length - 1) {
      let tempSummary: number[] = this.state.summary;
      tempSummary[this.state.pageId] = id;
      tempSummary.length = this.state.pageId + 1;
      this.setState(prevState => ({ summary: prevState.summary }));
    }
  }

  private getContent = (pageId: number) => {
    switch (pageId) {
      case 1:
        return this.cars.model.filter(x => x.brandId === this.state.summary[0]);
      case 2:
        return this.cars.engine.filter(x => this.cars.model[x.id].availableEngineIds!.includes(x.id));
      case 3:
        return this.cars.gear.filter(x => this.cars.model[x.id].availableGearsIds!.includes(x.id));
      case 4:
        return this.state.summary.map((item, index) => {
          const entityName: string = pages[index].entity;
          return {
            id: index,
            name: `${entityName}: ${this.cars[entityName][this.state.summary[index] - 1].name}`
          };
        });
      default:
        return this.cars.brand;
    }
  }

  public render(): React.ReactNode {
    return (
      <>
        <div className="navigation">
          <NavButton
            pageId={this.state.pageId}
            maxPages={this.pages.length}
            summary={this.state.summary}
            onClickTo={this.onClickBack}
            name="Back" />
          <NavButton
            pageId={this.state.pageId}
            maxPages={this.pages.length}
            summary={this.state.summary}
            onClickTo={this.onClickFwd}
            name="Forward" />
        </div>
        <Content
          content={this.state.content}
          pages={this.pages}
          pageId={this.state.pageId}
          summary={this.state.summary}
          onItemClick={this.onItemClick} />
      </>
    );
  }
}

export default App;