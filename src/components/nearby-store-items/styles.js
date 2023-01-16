import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Colors from '../../services/constants/colors'
const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(90),
        height: responsiveHeight(15),
        backgroundColor: Colors.white,
        borderRadius: 10,
        margin: responsiveWidth(2.5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 5,
        padding: responsiveWidth(2.5)
    },
    image: {
        width: responsiveWidth(25),
        height: responsiveHeight(14),
        resizeMode: 'cover',
        borderRadius: 10,
    },
    detailsContainer: {
        marginLeft: responsiveWidth(2),
    },
    headerText: {
        color: Colors.black,
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },
    seeAllText: {
        color: Colors.grey,
        fontSize: responsiveFontSize(1.5),
        marginVertical: responsiveHeight(.75),
        marginLeft: responsiveWidth(1.5)
    },
    priceContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    discountedPriceText: {
        color: Colors.orange,
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
    },
    oldPriceText: {
        color: Colors.grey,
        fontWeight: '600',
        fontSize: responsiveFontSize(2),
        textDecorationLine: 'line-through',
        marginLeft: responsiveWidth(1)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

//make this component available to the app
export default styles