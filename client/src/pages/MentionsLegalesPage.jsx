import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/ui/Header';

const MentionsLegales = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === '#mentions-legales-title') {
      const element = document.getElementById('mentions-legales-title');
      if (element) {
        const yOffset = -100;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20">
        <div className="container mx-auto px-4 py-8">
          <h1
            id="mentions-legales-title"
            className="text-4xl md:text-5xl font-bold text-center mt-16 mb-4 text-blue-800"
          >
            Mentions Légales
          </h1>

          <div className="text-gray-800 text-left mx-auto max-w-2xl mb-8">
            <h2 className="text-xl font-semibold mt-6">
              1. PRESENTATION DU SITE
            </h2>
            <p>
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour
              la confiance dans l'économie numérique, il est précisé aux
              utilisateurs du site l'identité des différents intervenants dans
              le cadre de sa réalisation et de son suivi :
            </p>
            <p>Propriétaire : SAS ATYPIKHOUSE</p>
            <p>Design & développement : Conception</p>
            <p>Responsable publication : M. BENI KIYOUNGUILA</p>
            <p>Hébergeur : OVH, 2 quai du Sartel 59100 ROUBAIX</p>

            <h2 className="text-xl font-semibold mt-6">
              2. CONDITIONS GENERALES D'UTILISATION DU SITE ET DES SERVICES
              PROPOSES
            </h2>
            <p>
              L'utilisation du site implique l'acceptation pleine et entière des
              conditions générales d'utilisation ci-après décrites. Ces
              conditions d'utilisation sont susceptibles d'être modifiées ou
              complétées à tout moment, les utilisateurs du site sont donc
              invités à les consulter de manière régulière.
            </p>
            <p>
              Ce site est normalement accessible à tout moment aux utilisateurs.
              Une interruption pour raison de maintenance technique peutêtre
              toutefois décidée par la société.
            </p>
            <p>
              Le site est mis à jour régulièrement. De la même façon, les
              mentions légales peuventêtre modifiées à tout moment : elles
              s'imposent néanmoins à l'utilisateur qui est invité à s'y référer
              le plus souvent possible afin d'en prendre connaissance.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              3. DESCRIPTION DES SERVICES FOURNIS.
            </h2>
            <p>
              Le site a pour objet de fournir une information concernant
              l'ensemble des activités de la société ATYPIKHOUSE SAS.
            </p>
            <p>
              ATYPIKHOUSE SAS s'efforce de fournir sur le site des informations
              aussi précises que possible. Toutefois, il ne pourra être tenue
              responsable des omissions, des inexactitudes et des carences dans
              la mise à jour, qu'elles soient de son fait ou du fait des tiers
              partenaires qui lui fournissent ces informations.
            </p>
            <p>
              Tous les informations indiquées sur le site sont données à titre
              indicatif, et sont susceptibles d'évoluer. Par ailleurs, les
              renseignements figurant sur le site ne sont pas exhaustifs. Ils
              sont donnés sous réserve de modifications ayant été apportées
              depuis leur mise en ligne.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              4. LIMITATIONS CONTRACTUELLES SUR LES DONNEES TECHNIQUES
            </h2>
            <p>
              Le site Internet ne pourraêtre tenu responsable de dommages
              matériels liés à l'utilisation du site. De plus, l'utilisateur du
              site s'engage à accéder au site en utilisant un matériel récent,
              ne contenant pas de virus et avec un navigateur de dernière
              génération mis-à -jour.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              5. PROPRIETE INTELLECTUELLE ET CONTREFAà‡ONS
            </h2>
            <p>
              La SAS ATYPIKHOUSE est propriétaire des droits de propriété
              intellectuelle ou détient les droits d'usage sur tous les éléments
              accessibles sur le site, notamment les textes, images, graphismes,
              logo, icà´nes, sons, logiciels.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication,
              adaptation de tout ou partie des éléments du site, quel que soit
              le moyen ou le procédé utilisé, est interdite, sauf autorisation
              écrite préalable de la SAS ATYPIKHOUSE.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l'un quelconque des
              éléments qu'il contient sera considérée comme constitutive d'une
              contrefaçon et poursuivie conformément aux dispositions des
              articles L.335-2 et suivants du Code de Propriété Intellectuelle.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              6. LIMITATIONS DE RESPONSABILITE
            </h2>
            <p>
              La SAS ATYPIKHOUSE ne pourra être tenue responsable des dommages
              directs et indirects causés au matériel de l'utilisateur, lors de
              l'accès au site ATYPIKHOUSE.fr, et résultant soit de l'utilisation
              d'un matériel ne répondant pas aux spécifications indiquées au
              point 4, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p>
              ATYPIKHOUSE ne pourra égalementêtre tenue responsable des dommages
              indirects (tels par exemple qu'une perte de marché ou perte d'une
              chance) consécutifs à l'utilisation du site.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              7. GESTION DES DONNEES PERSONNELLES.
            </h2>
            <p>
              En France, les données personnelles sont notamment protégées par
              la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 aout
              2004, l'article L. 226-13 du Code pénal et la Directive Européenne
              du 24 octobre 1995.
            </p>
            <p>
              A l'occasion de l'utilisation du site, peuventêtres recueillies :
              l'URL des liens par l'intermédiaire desquels l'utilisateur a
              accédé au site , le fournisseur d'accès de l'utilisateur,
              l'adresse de protocole Internet (IP) de l'utilisateur.
            </p>
            <p>
              En tout état de cause la SAS ATYPIKHOUSE ne collecte des
              informations personnelles relatives à l'utilisateur que pour le
              besoin de certains services proposés par le site. L'utilisateur
              fournit ces informations en toute connaissance de cause, notamment
              lorsqu'il procède par lui-même à leur saisie. Il est alors précisé
              à l'utilisateur du site l'obligation ou non de fournir ces
              informations.
            </p>
            <p>
              Conformément aux dispositions des articles 38 et suivants de la
              loi 78-17 du 6 janvier 1978 relative à l'informatique, aux
              fichiers et aux libertés, tout utilisateur dispose d'un droit
              d'accès, de rectification et d'opposition aux données personnelles
              le concernant, en effectuant sa demande écrite et signée,
              accompagnée d'une copie du titre d'identité avec signature du
              titulaire de la pièce, en précisant l'adresse à laquelle la
              réponse doitêtre envoyée.
            </p>
            <p>
              Aucune information personnelle de l'utilisateur du site n'est
              publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou
              vendue sur un support quelconque à des tiers. Seule l'hypothèse du
              rachat de la société ATYPIKHOUSE et de ses droits permettrait la
              transmission des dites informations à l'éventuel acquéreur qui
              serait à son tour tenu de la même obligation de conservation et de
              modification des données vis à vis de l'utilisateur du site .
            </p>
            <p>
              Les bases de données sont protégées par les dispositions de la loi
              du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996
              relative à la protection juridique des bases de données.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              8. LIENS HYPERTEXTES ET COOKIES
            </h2>
            <p>
              Le site contient un certain nombre de liens hypertextes vers
              d'autres sites, mis en place avec l'autorisation d'ATYPIKHOUSE.
              Cependant, ATYPIKHOUSE n'a pas la possibilité de vérifier le
              contenu des sites ainsi visités, et n'assumera en conséquence
              aucune responsabilité de ce fait.
            </p>
            <p>
              La navigation sur le site est susceptible de provoquer
              l'installation de cookie(s) sur l'ordinateur de l'utilisateur. Un
              cookie est un fichier de petite taille, qui ne permet pas
              l'identification de l'utilisateur, mais qui enregistre des
              informations relatives à la navigation d'un ordinateur sur un
              site. Les données ainsi obtenues visent à faciliter la navigation
              ultérieure sur le site, et ont également vocation à permettre
              diverses mesures de fréquentation.
            </p>
            <p>
              Le refus d'installation d'un cookie peut entrainer l'impossibilité
              d'accéder à certains services. L'utilisateur peut toutefois
              configurer son ordinateur de la manière suivante, pour refuser
              l'installation des cookies.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              9. DROIT APPLICABLE ET ATTRIBUTION DE JURIDICTION
            </h2>
            <p>
              Tout litige en relation avec l'utilisation du site est soumis au
              droit français. Il est fait attribution exclusive de juridiction
              aux tribunaux compétents de Paris.
            </p>

            <h2 className="text-xl font-semibold mt-6">
              10. LES PRINCIPALES LOIS CONCERNEES
            </h2>
            <p>
              Loi n° 78-87 du 6 janvier 1978, notamment modifiée par la loi n°
              2004-801 du 6 aout 2004 relative à l'informatique, aux fichiers et
              aux libertés.
            </p>
            <p>
              Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie
              numérique.
            </p>

            <h2 className="text-xl font-semibold mt-6">11. LEXIQUE</h2>
            <p>
              Utilisateur : Internaute se connectant, utilisant le site
              susnommé.
            </p>
            <p>
              Informations personnelles : les informations qui permettent, sous
              quelque forme que ce soit, directement ou non, l'identification
              des personnes physiques auxquelles elles s'appliquent à (article 4
              de la loi n° 78-17 du 6 janvier 1978).
            </p>

            <h2 className="text-xl font-semibold mt-6">
              12. AUTORISATION D'EXERCER
            </h2>
            <p>AUT-159-20255-11-17-201880361963 Art. L 612-14 du CSI :</p>
            <p>
              L'autorisation d'exercice ne confère aucune prérogative de
              puissance publique à l'entreprise ou aux personnes qui en
              bénéficient.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentionsLegales;
