import {View} from 'react-native';
import UI_Text from '../../ui/components/basic/Text';
import {BLOCK_SPACING} from '../../constants/SIZES';
import {useEffect, useState} from 'react';
import {useDb} from '../_layout';
import UI_NearestStation from "../../ui/components/fuel/NearestStation";

export default function home() {
  const db = useDb();
  const [dbVersion, setDbVersion] = useState<number>(null);
  useEffect(() => {
    if (db == null) {
      return;
    }
    db.executeQuery('SELECT migration from migrations').then((res) => {
      setDbVersion(res[0].migration as number);
      return;
    });
  }, [db]);
  return <View style={{padding: BLOCK_SPACING.MD}}>
    <UI_NearestStation />
    <View style={{padding: 10}}>
      <UI_Text padding={BLOCK_SPACING.MD}>This is the home page</UI_Text>
      <UI_Text>
                Quia nesciunt incidunt inventore. Ut non maxime esse accusamus ab blanditiis laboriosam ipsum. Et illo in sed enim ab non dolor.
                Tempora eveniet et est placeat error magni. Odio voluptatum rerum sit quia voluptas. Aut hic aliquam quas. Eveniet voluptas dolorum magnam eum qui soluta autem dolores.
                Dolorum at nihil sit incidunt hic et. Voluptas consequatur ea ut doloribus rerum aut voluptatem dolorem. Autem doloribus necessitatibus minus aut aut quibusdam ducimus ad. Perspiciatis sunt quia et delectus unde qui soluta atque.
                Nisi enim rerum dolores ad magnam doloremque reprehenderit. Nam provident id harum ipsum qui. Vitae molestiae optio dolor.
                Quia quam qui quo. Accusantium voluptatem omnis culpa at magni quis. Quidem rerum temporibus non quae. Accusamus et impedit et debitis adipisci omnis modi voluptatum. Deleniti sequi aut quisquam provident illo dolorem.
      </UI_Text>
      <UI_Text right>{`DB Version: ${dbVersion}`}</UI_Text>
    </View>
  </View>;
}