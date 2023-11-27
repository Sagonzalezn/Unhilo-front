import { Box, Typography, useTheme } from "@mui/material";
import Related from "components/Related";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRelated } from "state";

const RelatedListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const related = useSelector((state) => state.user.related);
    
    const getRelated = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/related`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        dispatch(setRelated({ related: data }));
    };

    useEffect(() => {
        getRelated();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem"}}
            >
                Relacionados:
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {related.map((related) => (
                    <Related 
                        key={related._id}
                        relatedId={related._id}
                        name={`${related.nametag}`}
                        subtitle={related.times}
                        userPicturePath={related.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default RelatedListWidget;