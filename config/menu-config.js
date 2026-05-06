/**
 * config/menu-config.js
 * IA Clean-up & Grouping — Omni-Growth Workspace 2026
 *
 * Tối ưu UX: 
 * - Loại bỏ các folder thừa ở System, CJM360.
 * - Tinh gọn danh sách chi nhánh trong Clienteling (Chỉ điều hướng theo tháng).
 * - Cập nhật Icon Semantic & Bảng màu Premium.
 */

export const workspaceMenu = [
    /* ═══════════════════════════════════════════════════════════════════════
       1. CLIENTELING (Theme: Teal / Xanh mòng két)
       ═══════════════════════════════════════════════════════════════════════ */
    {
        moduleName: 'Clienteling',
        icon: 'fa-handshake', // Icon mang tính kết nối khách hàng
        theme: 'teal',
        subGroups: [
            {
                groupName: 'Monthly',
                features: [
                    { name: 'Tháng 01/2026', url: '/modules/clienteling/monthly/2026/01/tong-quan.html', status: 'active' },
                    { name: 'Tháng 02/2026', url: '/modules/clienteling/monthly/2026/02/tong-quan.html', status: 'active' },
                    { name: 'Tháng 03/2026', url: '/modules/clienteling/monthly/2026/03/tong-quan.html', status: 'active' }
                ]
            },
            {
                groupName: '30D Lookback',
                features: [
                    { name: 'Tháng 01/2026', url: '/modules/updating.html', status: 'coming-soon' },
                    { name: 'Tháng 02/2026', url: '/modules/updating.html', status: 'coming-soon' }
                ]
            },
            { groupName: 'Quarterly', features: [] },
            { groupName: 'Campaigns', features: [] }
        ]
    }
];