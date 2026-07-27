import { registerFileAction } from '@nextcloud/files'

registerFileAction({
    id: 'signaturepdf_nextcloud',
    displayName: () => 'Manipuler le PDF',
    iconSvgInline: () => `<?xml version="1.0" encoding="UTF-8"?>
    <svg class="bi bi-vector-pen" width="128" height="128" fill="currentColor" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
     <g>
      <path transform="matrix(8.8987 .096786 -.10055 9.2443 31.96 59.832)" d="m7.8108 6.7552-8.3381 0.076965-2.6498-7.9062 6.7004-4.9633 6.7909 4.8388z" fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".62444"/>
      <text x="3.3365262" y="15.189817" display="none" fill="#ffffff" font-family="Montserrat" font-size="4.5924px" font-weight="bold" stroke-linecap="round" stroke-linejoin="round" stroke-width=".14462" style="line-height:0" xml:space="preserve"><tspan x="0" y="0" fill="#ffffff" font-family="'Montserrat Alternates'" font-weight="bold" stroke-width=".14462">PDF</tspan></text>
      <path d="m53.302 85.686 8.9375-57.383 17.013-9.7263 24.828 12.794 1.2783 26.258z" fill="#b3b3b3"/>
     </g>
     <path d="m29.105 91.402v24.883h5.7585v-6.8605h5.0121c6.6472 0 10.806-3.448 10.806-8.9933 0-5.5808-4.159-9.0288-10.806-9.0288zm5.7585 13.33v-8.6378h4.6922c3.5191 0 5.2964 1.5996 5.2964 4.3367 0 2.7015-1.7773 4.3011-5.2964 4.3011zm31.21 11.553c8.1402 0 13.721-4.9054 13.721-12.441s-5.5808-12.441-13.721-12.441h-11.304v24.883zm-5.5453-20.155h5.2609c4.941 0 8.1757 2.9504 8.1757 7.7136 0 4.7632-3.2347 7.7136-8.1757 7.7136h-5.2609zm35.191-0.24883c1.7418 0 3.5902 0.39101 5.1187 1.3863l1.7773-4.55c-1.8484-1.1375-4.4433-1.7418-7.2871-1.7418-7.1804 0-11.41 3.7324-11.41 10.131v15.178h5.7585v-9.0644h10.237v-4.621h-10.237v-1.5285c0-3.448 2.0617-5.1898 6.0429-5.1898z" fill="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1194" aria-label="PDF"/>
     <g transform="matrix(5.3311 -.83087 .83087 5.3311 32.586 10.548)" fill-rule="evenodd">
      <path d="m10.558 0.63236c0.19536-0.19586 0.51264-0.19586 0.708 0l4 4c0.19586 0.19536 0.19586 0.51264 0 0.708l-1.902 1.902-0.829 3.313c-0.12825 0.51321-0.51734 0.92092-1.024 1.073l-10.345 3.104 3.104-10.346c0.1522-0.50602 0.55942-0.89462 1.072-1.023l3.313-0.828zm-1.8 2.908-3.173 0.793c-0.17136 0.04277-0.30745 0.17277-0.358 0.342l-2.57 8.565 8.567-2.57c0.1682-0.05097 0.29729-0.18651 0.34-0.357l0.794-3.174-3.6-3.6z" stroke-width="1.7978"/>
      <path d="m2.7445 13.214 5.168-4.228a1 1 0 1 0-1-1l-4.228 5.168-0.026 0.086z"/>
     </g>
     <path transform="matrix(.84513 -.6133 .6133 .84513 6.7991 8.4271)" d="m-3.5319-5.1373 8.7892-0.079523 2.7916 8.3344-7.0638 5.2305-7.1573-5.1018z" display="none" fill="none" stroke="#000" stroke-linejoin="bevel"/>
     <text x="26.154791" y="115.48382" display="none" fill="#000000" font-family="Montserrat" font-size="35.547px" font-weight="bold" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1194" style="line-height:0" xml:space="preserve"><tspan x="0" y="0" fill="#000000" font-family="'Montserrat Alternates'" font-weight="bold" stroke-width="1.1194">PDF</tspan></text>
    </svg>`,
    enabled(context) {
       return context.nodes.length >= 1
    },
    exec: async (context) => {
      return null;
    },
    order: 99
})


registerFileAction({
    id: 'signaturepdf_nextcloud_signature',
    displayName: () => 'Signer',
    iconSvgInline: () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vector-pen" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
    <path fill-rule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086z"/>
    </svg>
    `,
    enabled(context) {
       return context.nodes.length >= 1
    },
    exec: async (context) => {
      const file = context.nodes[0];
      document.location = "/index.php/apps/signaturepdf_nextcloud/signature?fileid="+file.fileid+"&path="+file.path+"&source="+file.source;
    },
    parent: "signaturepdf_nextcloud"
})

registerFileAction({
    id: 'signaturepdf_nextcloud_organization',
    displayName: () => 'Organiser',
    iconSvgInline: () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ui-checks-grid" viewBox="0 0 16 16">
    <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z"/>
    </svg>
    `,
    enabled(context) {
       return context.nodes.length >= 1
    },
    exec: async (context) => {
      const file = context.nodes[0];
      document.location = "/index.php/apps/signaturepdf_nextcloud/organization?fileid="+file.fileid+"&path="+file.path+"&source="+file.source;
    },
    parent: "signaturepdf_nextcloud"
})

registerFileAction({
    id: 'signaturepdf_nextcloud_metadata',
    displayName: () => 'Métadonnées',
    iconSvgInline: () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/>
    </svg>
    `,
    enabled(context) {
       return context.nodes.length >= 1
    },
    exec: async (context) => {
      const file = context.nodes[0];
      document.location = "/index.php/apps/signaturepdf_nextcloud/metadata?fileid="+file.fileid+"&path="+file.path+"&source="+file.source;
    },
    parent: "signaturepdf_nextcloud"
})

registerFileAction({
    id: 'signaturepdf_nextcloud_compress',
    displayName: () => 'Compresser',
    iconSvgInline: () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-contract" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
    </svg>
    `,
    enabled(context) {
       return context.nodes.length >= 1
    },
    exec: async (context) => {
      const file = context.nodes[0];
      document.location = "/index.php/apps/signaturepdf_nextcloud/compress?fileid="+file.fileid+"&path="+file.path+"&source="+file.source;
    },
    parent: "signaturepdf_nextcloud"
})
