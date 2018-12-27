import React, {MouseEvent} from "react";
import classNames from "classnames";

import {IEntity, IPages} from "../../common/interfaces";

interface IContentProps {
    pageId: number;
    content: IEntity[];
    summary: number[];
    pages: IPages[];
    onItemClick: (event: MouseEvent<HTMLLIElement>) => void;
}

export const Content: (props: IContentProps) => JSX.Element = ( props ) => {
    const { content, pages, pageId, onItemClick, summary } = props;
    return (
        <div className="content">
            <label className="label">{pages[pageId].title}</label>
            <ul>
                {content.map((item) => {
                    const btnClass: string = classNames({
                        "selected": summary[pageId] === item.id,
                        "clickable": pageId < pages.length - 1,
                    });
                    return (
                        <li
                            className={btnClass}
                            onClick={onItemClick}
                            key={item.id}
                            value={item.id}>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};