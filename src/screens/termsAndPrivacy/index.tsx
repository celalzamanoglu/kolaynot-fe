import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export const TermsAndPrivacy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Gizlilik Bildirimi</Text>
        <Text style={styles.date}>Son güncelleme: 20 Mart 2024</Text>

        <Text style={styles.paragraph}>
          KolayNot topluluğumuzun bir parçası olmayı seçtiğiniz için teşekkür ederiz. Kişisel bilgilerinizi ve gizlilik
          haklarınızı korumaya kararlıyız. Bu gizlilik bildirimi veya uygulamalarımızla ilgili herhangi bir sorunuz veya
          endişeniz varsa, lütfen bizimle iletişime geçin.
        </Text>

        <Text style={styles.paragraph}>
          Bu gizlilik bildirimi, şu durumlarda bilgilerinizi nasıl kullanabileceğimizi açıklar:
        </Text>
        <Text style={styles.bulletPoint}>• Mobil uygulamamızı indirip kullandığınızda</Text>
        <Text style={styles.bulletPoint}>
          • Satış, pazarlama veya etkinlikler dahil olmak üzere bizimle etkileşime geçtiğinizde
        </Text>

        <Text style={styles.sectionTitle}>1. HANGİ BİLGİLERİ TOPLUYORUZ?</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Kısa Özet:</Text> Bize sağladığınız kişisel bilgileri topluyoruz.
        </Text>
        <Text style={styles.paragraph}>
          Bizimle olan etkileşimleriniz, yaptığınız seçimler ve kullandığınız ürün ve özellikler bağlamında gönüllü
          olarak sağladığınız kişisel bilgileri topluyoruz. Bize sağladığınız tüm kişisel bilgiler doğru, eksiksiz ve
          güncel olmalıdır.
        </Text>

        <Text style={styles.sectionTitle}>2. BİLGİLERİNİZ BAŞKALARIYLA PAYLAŞILACAK MI?</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Kısa Özet:</Text> Bilgileri yalnızca sizin izninizle, yasalara uymak için, size
          hizmet sağlamak için, haklarınızı korumak için veya iş yükümlülüklerini yerine getirmek için paylaşırız.
        </Text>
        <Text style={styles.paragraph}>Verilerinizi şu yasal temellere dayanarak işleyebilir veya paylaşabiliriz:</Text>
        <Text style={styles.bulletPoint}>
          • Onay: Belirli bir amaç için kişisel bilgilerinizi kullanmamıza özel izin verdiyseniz
        </Text>
        <Text style={styles.bulletPoint}>
          • Meşru Çıkarlar: Meşru iş çıkarlarımızı gerçekleştirmek için makul ölçüde gerekli olduğunda
        </Text>
        <Text style={styles.bulletPoint}>
          • Sözleşme Performansı: Sizinle yaptığımız bir sözleşmenin şartlarını yerine getirmek için
        </Text>
        <Text style={styles.bulletPoint}>
          • Yasal Yükümlülükler: Yasal bir yükümlülüğe uymak için gerekli olduğunda
        </Text>

        <Text style={styles.sectionTitle}>3. BİLGİLERİNİZİ NE KADAR SÜRE SAKLIYORUZ?</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Kısa Özet:</Text> Bilgilerinizi, yasa tarafından başka şekilde gerekli kılınmadıkça,
          bu gizlilik bildiriminde belirtilen amaçlar için gerekli olduğu sürece saklarız.
        </Text>
        <Text style={styles.paragraph}>
          Kişisel bilgilerinizi yalnızca bu gizlilik bildiriminde belirtilen amaçlar için gerekli olduğu sürece
          saklayacağız. Hiçbir amaç için kişisel bilgilerinizi 90 günden daha uzun süre saklamayacağız.
        </Text>

        <Text style={styles.sectionTitle}>4. BİLGİLERİNİZİ NASIL GÜVENDE TUTUYORUZ?</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Kısa Özet:</Text> Kişisel bilgilerinizi organizasyonel ve teknik güvenlik önlemleri
          sistemi aracılığıyla korumayı amaçlıyoruz.
        </Text>
        <Text style={styles.paragraph}>
          İşlediğimiz kişisel bilgilerin güvenliğini korumak için tasarlanmış uygun teknik ve organizasyonel güvenlik
          önlemleri uyguladık. Ancak, internet üzerinden hiçbir elektronik iletimin veya bilgi depolama teknolojisinin
          %100 güvenli olmadığını unutmayın.
        </Text>

        <Text style={styles.sectionTitle}>5. GİZLİLİK HAKLARINIZ NELERDİR?</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Kısa Özet:</Text> Avrupa Ekonomik Alanı (AEA) ve Birleşik Krallık (BK) gibi bazı
          bölgelerde, kişisel bilgileriniz üzerinde daha fazla erişim ve kontrol sağlamanıza olanak tanıyan haklara
          sahipsiniz.
        </Text>
        <Text style={styles.paragraph}>
          Bazı bölgelerde (AEA ve BK gibi), geçerli veri koruma yasaları kapsamında belirli haklara sahipsiniz. Bunlar
          şunları içerebilir:
        </Text>
        <Text style={styles.bulletPoint}>• Kişisel bilgilerinize erişim talep etme ve bir kopyasını alma hakkı</Text>
        <Text style={styles.bulletPoint}>• Düzeltme veya silme talep etme hakkı</Text>
        <Text style={styles.bulletPoint}>• Kişisel bilgilerinizin işlenmesini kısıtlama hakkı</Text>
        <Text style={styles.bulletPoint}>• Veri taşınabilirliği hakkı</Text>

        <Text style={styles.sectionTitle}>6. BU BİLDİRİMDE GÜNCELLEME YAPIYOR MUYUZ?</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Kısa Özet:</Text> Evet, ilgili yasalara uygun kalmak için bu bildirimi gerektiğinde
          güncelleyeceğiz.
        </Text>
        <Text style={styles.paragraph}>
          Bu gizlilik bildirimini zaman zaman güncelleyebiliriz. Güncellenmiş versiyon, güncellenmiş bir "Son
          güncelleme" tarihi ile belirtilecek ve erişilebilir olduğu andan itibaren geçerli olacaktır.
        </Text>

        <Text style={styles.sectionTitle}>7. BİZİMLE NASIL İLETİŞİME GEÇEBİLİRSİNİZ?</Text>
        <Text style={styles.paragraph}>
          Bu bildirimle ilgili sorularınız veya yorumlarınız varsa, lütfen bizimle iletişime geçin.
        </Text>

        <Text style={styles.sectionTitle}>
          8. VERİLERİNİZİ NASIL İNCELEYEBİLİR, GÜNCELLEYEBİLİR VEYA SİLEBİLİRSİNİZ?
        </Text>
        <Text style={styles.paragraph}>
          Ülkenizin geçerli yasalarına bağlı olarak, sizden topladığımız kişisel bilgilere erişim talep etme, bu
          bilgileri değiştirme veya bazı durumlarda silme hakkına sahip olabilirsiniz. Kişisel bilgilerinizi inceleme,
          güncelleme veya silme talebinde bulunmak için lütfen bizimle iletişime geçin.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 24,
    marginBottom: 12
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 16
  },
  bold: {
    fontWeight: '600'
  }
})
