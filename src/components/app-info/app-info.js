import "./app-info.scss";

const AppInfo = ({totalCount, increaseCount}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {totalCount}</h2>
            <h2>Премию получат: {increaseCount}</h2>
        </div>
    );  
}

export default AppInfo;