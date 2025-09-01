import { Banner } from '@/components/WebsiteComponents/Career/Banner'
import React from 'react'

const page = () => {
  return (
    <div>
      <Banner
        heading="سياسة الخصوصية"
        // breadcrumb="الرئيسية \ فرص العمل"
      />

      <div className="container mx-auto px-4 lg:px-16 py-[10rem]">
        <div className="bg-white rounded-lg p-8 space-y-6">
          {/* مقدمة */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              المقدمة
            </h2>
            <p className="text-gray-600 font-montserrat">
              أهلاً بكم في نيكست ليفل. نحن نقدّر خصوصيتكم ونلتزم بحماية معلوماتكم
              الشخصية. توضح سياسة الخصوصية هذه كيفية إدارتنا لبياناتكم الشخصية،
              وحقوقكم المتعلقة بالخصوصية، وكيفية حمايتكم بموجب القانون.
            </p>
          </section>

          {/* المعلومات التي نجمعها */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              المعلومات التي نجمعها
            </h2>
            <p className="text-gray-600 font-montserrat">
              عند تصفح موقعنا أو الاستفسار عن العقارات، قد نقوم بجمع المعلومات التالية:
            </p>
            <ul className="list-disc pl-6 font-montserrat space-y-2 text-gray-600">
              <li>المعلومات الشخصية: الاسم، عنوان البريد الإلكتروني، رقم الهاتف، والعنوان البريدي.</li>
              <li>تفضيلات العقارات: معلومات حول نوع العقار، الموقع، والميزانية التي تهمكم.</li>
              <li>بيانات التواصل: تفاصيل استفساراتكم ورسائلكم وتفاعلاتكم معنا.</li>
              <li>البيانات التقنية: عنوان الـ IP، نوع المتصفح، وبيانات استخدام الموقع لتحسين خدماتنا.</li>
            </ul>
          </section>

          {/* كيفية استخدام معلوماتكم */}
          <section>
            <h2 className="text-2xl font-semibold font-montserrat mb-4 text-gray-700">
              كيفية استخدام معلوماتكم
            </h2>
            <p className="text-gray-600 font-montserrat">
              نستخدم بياناتكم الشخصية لتقديم خدماتنا العقارية والحفاظ عليها وتحسينها، بما في ذلك:
            </p>
            <ul className="list-disc pl-6 font-montserrat space-y-2 text-gray-600">
              <li>مساعدتكم في العثور على العقارات التي تناسب احتياجاتكم.</li>
              <li>تزويدكم بمعلومات عن العقارات المتاحة وجدولة المواعيد.</li>
              <li>التواصل معكم بخصوص استفساراتكم ودعمكم في عمليات الشراء أو الإيجار.</li>
              <li>تخصيص تجربتكم على موقعنا لعرض قوائم عقارات أكثر ملاءمة لكم.</li>
            </ul>
          </section>

          {/* مشاركة معلوماتكم */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              مشاركة معلوماتكم
            </h2>
            <p className="text-gray-600 font-montserrat">
              قد نشارك بياناتكم الشخصية مع أطراف ثالثة لتسهيل خدماتنا، بما في ذلك:
            </p>
            <ul className="list-disc pl-6 font-montserrat space-y-2 text-gray-600">
              <li>وكلاء وسماسرة العقارات للمساعدة في المعاينات والصفقات.</li>
              <li>مزودو الخدمات مثل تحليلات الموقع وتحسيناته.</li>
            </ul>
            <p className="text-gray-600 font-montserrat">
              نحن لا نبيع معلوماتكم الشخصية لأطراف ثالثة.
            </p>
          </section>

          {/* حقوقكم */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              حقوقكم
            </h2>
            <p className="text-gray-600 font-montserrat">
              لديكم الحقوق التالية فيما يتعلق بمعلوماتكم الشخصية:
            </p>
            <ul className="list-disc font-montserrat pl-6 space-y-2 text-gray-600">
              <li>الحق في الوصول إلى بياناتكم الشخصية.</li>
              <li>الحق في طلب تصحيح البيانات غير الدقيقة.</li>
              <li>الحق في طلب حذف بياناتكم الشخصية.</li>
              <li>الحق في الاعتراض على استخدام بياناتكم أو تقييده.</li>
            </ul>
          </section>

          {/* أمان البيانات */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              أمان البيانات
            </h2>
            <p className="text-gray-600 font-montserrat">
              نستخدم إجراءات أمان معقولة لحماية بياناتكم الشخصية من الوصول أو الكشف
              أو الفقدان غير المصرح به. ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت
              آمنة تمامًا، ولا يمكننا ضمان أمان مطلق.
            </p>
          </section>

          {/* التغييرات على هذه السياسة */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              التغييرات على هذه السياسة
            </h2>
            <p className="text-gray-600 font-montserrat">
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو المتطلبات القانونية. نوصي بمراجعة هذه الصفحة بشكل دوري للاطلاع على التحديثات.
            </p>
          </section>

          {/* تواصل معنا */}
          <section>
            <h2 className="text-2xl font-montserrat font-semibold mb-4 text-gray-700">
              تواصل معنا
            </h2>
            <p className="text-gray-600 font-montserrat">
              إذا كان لديكم أي استفسارات بخصوص سياسة الخصوصية هذه أو ممارساتنا، يرجى التواصل معنا عبر:
            </p>
            <p className="text-gray-600 font-montserrat">
              <strong>البريد الإلكتروني:</strong> media@nextlevelrealestate.ae <br />
              <strong>الهاتف:</strong> ‎+97144542828
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default page
