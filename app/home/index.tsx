import {View} from "react-native";
import {Link} from "expo-router";
import {COLOR} from "../../constants/COLORS";
import UI_Text from "../../ui/components/basic/Text";
import {BLOCK_SPACING} from "../../constants/SIZES";

export default function home() {
    return <>
        <View style={{padding: 10}}>
            <UI_Text padding={BLOCK_SPACING.MD}>This is the home page</UI_Text>
            <UI_Text>
                Quia nesciunt incidunt inventore. Ut non maxime esse accusamus ab blanditiis laboriosam ipsum. Et illo in sed enim ab non dolor.
                Tempora eveniet et est placeat error magni. Odio voluptatum rerum sit quia voluptas. Aut hic aliquam quas. Eveniet voluptas dolorum magnam eum qui soluta autem dolores.
                Dolorum at nihil sit incidunt hic et. Voluptas consequatur ea ut doloribus rerum aut voluptatem dolorem. Autem doloribus necessitatibus minus aut aut quibusdam ducimus ad. Perspiciatis sunt quia et delectus unde qui soluta atque.
                Nisi enim rerum dolores ad magnam doloremque reprehenderit. Nam provident id harum ipsum qui. Vitae molestiae optio dolor.
                Quia quam qui quo. Accusantium voluptatem omnis culpa at magni quis. Quidem rerum temporibus non quae. Accusamus et impedit et debitis adipisci omnis modi voluptatum. Deleniti sequi aut quisquam provident illo dolorem.
            </UI_Text>
            <Link style={{color: COLOR.FONT_PRIMARY}} href="/">Start</Link>
        </View>
    </>
}