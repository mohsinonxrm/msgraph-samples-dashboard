﻿import { DetailsListLayoutMode, Fabric, IColumn, 
    initializeIcons, SelectionMode, ShimmeredDetailsList } from 'office-ui-fabric-react';
import * as React from 'react';

import PageTitle from '../components/layout/PageTitle';
import { IDetailsItem } from '../types/samples';

initializeIcons();
export default class Details extends React.Component<any, any> {
    private allItems: IDetailsItem[];

    constructor(props: {}) {
        super(props);

        this.allItems = [];
        const columns: IColumn[] = [
            { key: 'packageName', name: 'Library', fieldName: 'packageName', minWidth: 300, maxWidth: 400, isRowHeader: true, 
                isResizable: true, isSorted: true, isSortedDescending: false },
            { key: 'requirements', name: 'Sample Version', fieldName: 'requirements', minWidth: 200, maxWidth: 300, 
                isResizable: true },
            { key: 'currentVersion', name: 'Current Version', fieldName: 'currentVersion', minWidth: 200, 
                maxWidth: 300, isResizable: true },
            { key: 'status', name: 'Status', fieldName: 'status', minWidth: 200, maxWidth: 300, 
                isResizable: true },         
        ];

        this.state = {
            columns,
            items: this.allItems,
            repositoryDetails: {},
        };
    }

    public async componentDidMount() {    
        this.fetchData();
    }
        // do the fetch 
    public fetchData = async () => {
        const { match: { params } } = this.props;
        const repositoryName = params.name;
        const response = await fetch('api/samples/' + repositoryName);
        const data = await response.json();

        this.setState({
            items: data,
            repositoryDetails: {
                name: repositoryName
            }
        });
    }    
    

    public render(): JSX.Element {
        const { columns, items, repositoryDetails } = this.state;

        return (
            <Fabric>
                <div>
                    <PageTitle title={repositoryDetails.name} />
                    <ShimmeredDetailsList
                        items={items}
                        columns={columns}
                        selectionMode={SelectionMode.none}
                        layoutMode={DetailsListLayoutMode.justified}
                        onRenderItemColumn={renderItemColumn}
                        isHeaderVisible={true}
                    />
                </div>
            </Fabric>
        );
    }
} function renderItemColumn(item: IDetailsItem, index: number | undefined, column: IColumn | undefined) {
    const col = column as IColumn;
    const packageName = item[col.fieldName = 'packageName' as keyof IDetailsItem] as string;
    const version = item[col.fieldName = 'requirements' as keyof IDetailsItem] as string;
    const currentVersion = item[col.fieldName = 'currentVersion' as keyof IDetailsItem] as string;
    const status = item[col.fieldName = 'status' as keyof IDetailsItem] as string;
    
    const requirements = version.slice(2);
    switch (col.name) {
       
        case 'Library':
            return <span>{packageName} </span>;

        case 'Sample Version':
            return <span>{requirements} </span>;

        case 'Current Version':
            return <span>{currentVersion} </span>;

        case 'Status':
            return <span>{status} </span>;

    }
}

