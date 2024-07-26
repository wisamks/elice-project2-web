import './Footer.css';

const Footer = () => {
    return(
        <footer id="footer">
            <div className="footer-wrap">
                <div className="f-menu">
                    <ul>
                        <li><a href="#">회사소개</a></li>
                        <li><a href="#">중고거래</a></li>
                        <li><a href="#">의류수거함 위치</a></li>
                        <li><a href="#">의류수거함 인증</a></li>
                        <li><a href="#">리폼정보</a></li>
                        <li><a href="#">공지사항</a></li>
                        <li><a href="#">제휴문의</a></li>
                    </ul>
                </div>
                <div className="f-corp-info">
                    <p>
                        <span className='tag'>상호</span>
                        <span className='content'>EarthCloset</span>
                    </p>
                    <p>
                        <span className='tag'>대표</span>
                        <span className='content'>엘리스</span>
                    </p>
                    <p>
                        <span className='tag'>사업자번호</span>
                        <span className='content'>000-00-00000</span>
                        <span className='check-corp'><a href='#'>사업자확인</a></span>
                    </p>
                    <p>
                        <span className='tag'>주소</span>
                        <span className='content'>서울특별시 구로구 디지털로 000, 10층(EarthCloset)</span>
                    </p>
                    <p>
                        <span className='tag'>대표전화</span>
                        <span className='content'>1544-0000</span>
                    </p>
                    <p>
                        <span className='tag'>고객문의</span>
                        <span className='content'>cs@elice.com</span>
                    </p>
                    <p>
                        <span className='tag'>개인정보관리책임자</span>
                        <span className='content'>김토끼(rabbit@elice.com)</span>
                    </p>
                </div>
                <div className="f-policy-menu">
                    <ul>
                        <li><a href='#'>이용약관</a></li>
                        <li><a href='#'>개인정보처리방침</a></li>
                        <li><a href='#'>운영정책</a></li>
                        <li><a href='#'>위치기반서비스 이용약관</a></li>
                        <li><a href='#'>이용자보호 비전과 계획</a></li>
                        <li><a href='#'>청소년보호정책</a></li>
                    </ul>
                </div>
                <div className="f-copyright">COPYRIGHT ⓒ EarthCloset ALL RIGHTS RESERVED.</div>
            </div>
        </footer>
    );
};

export default Footer;