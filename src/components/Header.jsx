import React from "react";
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10px;
`

const Image = styled.img`
    width:500px;
    height:280px;
`

const Header = () => {
	return (
		<Container>
			<Image
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Squats.svg/660px-Squats.svg.png"
				alt=""
			/>
		</Container>
	);
};

export default Header;
