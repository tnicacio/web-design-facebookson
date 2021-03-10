import styles from '../../styles/pages/About.module.css';
import Head from 'next/head';
import { MenuBar } from '../../components/MenuBar';
import { Card } from '../../components/about/Card';
import { GeneralLayout } from '../../components/GeneralLayout';

export default function About() {
  return (
    <GeneralLayout pageTitle="About Me">
      <Card title="About">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        suscipit consequatur, fuga itaque, sint, facere in nam sapiente autem
        natus debitis veniam eveniet delectus rem? Praesentium dolor animi nobis
        quod quis cum dolores tempora doloribus, numquam temporibus alias!
        Officia quas ad, minus sequi quod ratione similique tempora laudantium,
        saepe harum enim, alias labore qui facere optio ullam quasi ut molestias
        sed ipsam laboriosam perferendis! Incidunt placeat nulla repellendus
        consectetur totam dolor distinctio corrupti, dolores, libero, sit rerum
        dignissimos eaque quaerat. Dignissimos autem laborum quis itaque sit
        minus sint quasi placeat amet necessitatibus commodi eligendi, deserunt
        doloremque voluptatem, aut molestiae blanditiis!
      </Card>
      <Card title="Cookies">
        Aqui irei falar sobre os cookies do site e como eles são úteis para este
        site. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        suscipit consequatur, fuga itaque, sint, facere in nam sapiente autem
        natus debitis veniam eveniet delectus rem? Praesentium dolor animi nobis
        quod quis cum dolores tempora doloribus, numquam temporibus alias!
        Officia quas ad, minus sequi quod ratione similique tempora laudantium,
        saepe harum enim, alias labore qui facere optio ullam quasi ut molestias
        sed ipsam laboriosam perferendis! Incidunt placeat nulla repellendus
        consectetur totam dolor distinctio corrupti, dolores, libero, sit rerum
        dignissimos eaque quaerat. Dignissimos autem laborum quis itaque sit
        minus sint quasi placeat amet necessitatibus commodi eligendi, deserunt
        doloremque voluptatem, aut molestiae blanditiis!
      </Card>
      <Card title="Terceiro Card">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
        laborum quia quisquam veritatis a labore molestias, adipisci voluptatem
        hic repellat sunt, necessitatibus beatae excepturi laboriosam omnis
        aspernatur molestiae, magnam vitae voluptatibus! Facere cumque neque
        dolore tenetur quae incidunt, ea obcaecati nulla debitis, mollitia error
        soluta repudiandae. Quaerat modi reiciendis doloremque laborum quis.
        Nisi quos, dolorem necessitatibus illum quis sed, nulla esse qui labore
        aut quisquam sint porro beatae consectetur rerum in aliquid consequuntur
        mollitia, sapiente numquam autem eligendi saepe recusandae. Quisquam
        suscipit ipsum, reprehenderit a ullam quia dignissimos alias voluptates
        quaerat ex asperiores corporis illum cupiditate corrupti officia amet
        totam tempora error animi voluptatum quidem porro consequatur et
        aspernatur. Amet sapiente minima doloribus minus exercitationem mollitia
        pariatur modi id consequuntur, quia ut maiores corporis recusandae
        libero ad commodi, quidem, fuga in totam suscipit. Distinctio
        accusantium assumenda veniam aliquam, excepturi iste nisi dolore
        repellendus nobis iure id placeat sed perferendis exercitationem sequi
        soluta delectus quasi sint fugit reiciendis est temporibus. Nam aliquam
        omnis modi, nisi, soluta officia nesciunt suscipit minus illum quam
        mollitia libero molestias voluptatem aut, velit a dicta iste repellat
        dolores temporibus aperiam! Ipsum voluptate esse sapiente? Quibusdam qui
        doloremque fugiat minima iure nesciunt odit eveniet quod sapiente
        nostrum.
      </Card>
    </GeneralLayout>
  );
}
