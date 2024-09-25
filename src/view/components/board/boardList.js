import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BoardList = () => {
    const [responseBoardList, setResponseBoardList] = useState([]); // 전체 게시글 목록
    const [filteredBoardList, setFilteredBoardList] = useState([]); // 필터링된 게시글 목록
    const [searchType, setSearchType] = useState('n'); // 기본 검색 타입 (n: 전체)
    const [keyword, setKeyword] = useState(''); // 검색 키워드
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1); // 페이지 수
    const [pageSize] = useState(10); // 페이지당 항목 수
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        callBoardAPI();
    }, []);

    const callBoardAPI = async () => {
        try {
            const response = await axios.get('http://localhost:8080/board/boardList');
            const data = response.data.boardList;

            const totalItems = data.length;
            const totalPage = Math.ceil(totalItems / pageSize);

            setResponseBoardList(data);
            setFilteredBoardList(data);
            setTotalItems(totalItems);
            setTotalPage(totalPage);
        } catch (error) {
            alert('오류: ' + error);
        }
    };

    const handleSearch = () => {
        let filteredList = responseBoardList;

        if (keyword) {
            filteredList = responseBoardList.filter(board => {
                switch (searchType) {
                    case 't': // 제목 검색
                        return board.btitle.toLowerCase().includes(keyword.toLowerCase());
                    case 'w': // 작성자 검색
                        return board.bwriter.toLowerCase().includes(keyword.toLowerCase());
                    case 'tw': // 제목/작성자 검색
                        return board.btitle.toLowerCase().includes(keyword.toLowerCase()) ||
                               board.bwriter.toLowerCase().includes(keyword.toLowerCase());
                    default:
                        return true;
                }
            });
        }

        const totalItems = filteredList.length;
        const totalPage = Math.ceil(totalItems / pageSize);

        setFilteredBoardList(filteredList);
        setTotalItems(totalItems);
        setTotalPage(totalPage);
        setCurrentPage(1); // 검색 후 첫 페이지로 초기화
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const renderPagination = () => {
        if (totalPage <= 1) return null;

        const pages = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(i);
        }

        return (
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}
                <button 
                    onClick={() => setCurrentPage(Math.min(totalPage, currentPage + 1))}
                    disabled={currentPage === totalPage}
                >
                    다음
                </button>
            </div>
        );
    };

    const FloatBoardAppend = () => {
        if (!filteredBoardList || filteredBoardList.length === 0) {
            return <tr><td colSpan="5">데이터가 없습니다</td></tr>;
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedBoardList = filteredBoardList.slice(startIndex, endIndex);

        return paginatedBoardList.map((board) => (
            <tr key={board.bno}>
                <td>{board.bno}</td>
                <td className="title-align">
                    <Link to={'/board/boardread/' + board.bno}>
                        {board.btitle} <strong>({board.bccnt})</strong>
                    </Link>
                </td>
                <td>{board.bwriter}</td>
                <td>{board.bdate}</td>
                <td><strong>{board.bcnt}</strong></td>
            </tr>
        ));
    };

    return (
        <main id="main">
            <section className="content">
                <div className="row">
                    <section className="intro-single">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-lg-8">
                                    <div className="title-single-box">
                                        <h1 className="title-single">자유게시판</h1>
                                        <span className="color-text-a">자유롭게 대화해보세요!</span>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">홈</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">자유게시판</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="community-grid grid">
                        <div className="container">
                            <div className="list-box">
                                <div className="box-header with-border">
                                    <div className="row">
                                        <div className="search-box">
                                            <select name="searchType" onChange={handleSearchTypeChange}>
                                                <option value="n">---전체---</option>
                                                <option value="t">제목</option>
                                                <option value="w">작성자</option>
                                                <option value="tw">제목 / 작성자</option>
                                            </select>
                                            <input 
                                                type="text" 
                                                name='keyword' 
                                                value={keyword}
                                                onChange={handleKeywordChange}
                                            />
                                            <button onClick={handleSearch}>검색</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="board-main">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="short">글번호</th>
                                                    <th>제목</th>
                                                    <th className="middle">작성자</th>
                                                    <th className="long">작성일</th>
                                                    <th className="short">조회수</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {FloatBoardAppend()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {renderPagination()}
                            </div>
                            <div className="box-footer">
                                <div className="list-registBtn">

                                    <a href='/board/boardregist'>
                                        <button className="green-button btn button-text" id="list-registBtn">
                                            <strong>작성하기</strong>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};
export default BoardList;