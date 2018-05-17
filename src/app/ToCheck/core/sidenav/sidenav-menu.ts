import { SidenavItem } from "@app/core/sidenav/sidenav-item/sidenav-item.interface";

export const menuItems : SidenavItem[] = [
    {
        name: 'Dashboard',
        routeOrFunction: '/',
        icon: 'dashboard',
        position: 1,
        pathMatchExact: true
    },
    {
        name: 'Lazy',
        icon: 'insert_comment',
        position: 2,
        badge: '2',
        badgeColor: '#4CAF50',
        subItems: [
            {
                name: 'Home',
                routeOrFunction: 'lazy',
                position: 1
            },
            {
                name: 'Nested',
                routeOrFunction: 'lazy/nested',
                position: 2
            }
        ]
    },
    {
        name: 'Inbox',
        routeOrFunction: '/apps/inbox',
        icon: 'mail',
        position: 3,
        badge: '22',
        badgeColor: '#7986CC'
    },
    {
        name: 'Chat',
        routeOrFunction: '/apps/chat',
        icon: 'chat',
        position: 4,
        badge: '14',
        badgeColor: '#E15C74'
    },
    {
        name: 'Home',
        routeOrFunction: 'home',
        icon: 'date_range',
        position: 5
    },
    {
        name: 'Components',
        routeOrFunction: '/components',
        icon: 'layers',
        position: 6
    },
    {
        name: 'Tables',
        icon: 'format_line_spacing',
        position: 7,
        subItems: [
            {
                name: 'Simple Table',
                routeOrFunction: '/tables/simple-table',
                position: 1
            },
            {
                name: 'All-In-One Table',
                routeOrFunction: '/tables/all-in-one-table',
                position: 2
            }
        ]
    },
    {
        name: 'Maps',
        icon: 'map',
        position: 8,
        subItems: [
            {
                name: 'Google Maps',
                routeOrFunction: '/maps/google-maps'
            }
        ],
        badge: '3',
        badgeColor: '#4CAF50'
    },
    {
        name: 'Material Icons',
        routeOrFunction: '/icons',
        icon: 'grade',
        position: 9
    },
    {
        name: 'Custom Pages',
        icon: 'web',
        position: 10,
        subItems: [
            {
                name: 'Login Page',
                routeOrFunction: '/login',
                position: 1
            },
            {
                name: 'Register Page',
                routeOrFunction: '/register',
                position: 2
              },
          {
            name: 'Forgot Password',
            routeOrFunction: '/forgot-password',
            position: 3
          },
        ]
    },
    {
        name: 'Drag & Drop',
        routeOrFunction: '/drag-and-drop',
        icon: 'mouse',
        position: 11
    },
    {
        name: 'WYSIWYG Editor',
        routeOrFunction: '/editor',
        icon: 'format_shapes',
        position: 12
    },
    {
        name: 'Multi-Level Menu',
        icon: 'menu',
        position: 13,
        subItems: [
            {
                name: 'Level 1',
                subItems: [{
                    name: 'Level 2',
                    subItems: [{
                        name: 'Level 3',
                        subItems: [
                            {
                                name: 'Level 4',
                                subItems: [{
                                    name: 'Level 5',
                                    routeOrFunction: '/level1/level2/level3/level4/level5'
                                }]
                            }
                    
                        ]
                      }
                    ]
                  }
                ]
              }
        ]
      },
      {
        name: 'Drag & Drop',
        routeOrFunction: '/drag-and-drop',
        icon: 'mouse',
        position: 11
      },
      {
        name: 'WYSIWYG Editor',
        routeOrFunction: '/editor',
        icon: 'format_shapes',
        position: 12
      },

]

