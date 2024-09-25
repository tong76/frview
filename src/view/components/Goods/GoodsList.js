import { Component } from 'react';
import axios from 'axios';

class GoodsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responseGoodsList: '',
            append_GoodsList:''
        }
    }

    componentDidMount() {
        this.callGoodsListApi()
    }

    callGoodsListApi = async () => {
        axios.get("http://localhost:8080/goods/goodslist", {
        }).then( response => {

        })
    }

    render() {
        return (
            <main id="main">
                <section class="intro-single">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-lg-8">
                                <div class="title-single-box">
                                    <h1 class="title-single">굿즈스토어</h1>
                                    <span class="color-text-a">팝업스토어에서 판매중인 기간 한정 굿즈들을 만나보세요!</span>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-4">
                                <nav aria-label="breadcrumb"
                                    class="breadcrumb-box d-flex justify-content-lg-end">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html">메인으로</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                            굿즈스토어</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="news-grid grid">
                    <div class="container">
                        <div class="row">

                                <div class="col-md-4">
                                    <div class="card-box-a card-shadow">
                                        <div class="img-box-a">
                                            <img src={require("../../../resources/assets/img/deadwolv-figure1.jpg")} alt="" class="img-a img-fluid"/>
                                        </div>
                                        <div class="card-overlay">
                                            <div class="card-overlay-a-content">
                                                <div class="card-header-a">
                                                    <h2 class="card-title-a">
                                                        <a href="/board/productList?sno=${PopVO.sno}">이름
                                                        </a>
                                                    </h2>
                                                </div>
                                                <div class="card-body-a">
                                                    <div class="price-box d-flex"></div>
                                                    <a href="#" class="link-a">장소 <span
                                                        class="bi bi-chevron-right"></span>
                                                    </a>
                                                </div>
                                                <div class="card-footer-a">
                                                    <ul class="card-info d-flex justify-content-around">
                                                        <li>
                                                            <h4 class="card-info-title">개최날짜: </h4> <span></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                </section>

            </main>

        );

    }

}

export default GoodsList;